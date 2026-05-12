import type { Task, TaskStatus } from "./task";

// 서버 = DummyJSON API
const BASE_URL = "https://dummyjson.com";

// DummyJSON은 create/update가 영구 반영되지 않아 화면에서 값이 "안 바뀌는 것처럼" 보일 수 있음.
// 그래서 클라이언트에서 생성/수정/삭제를 localStorage에 저장하고, 조회 시 항상 합쳐서 반환한다.
const TASK_LOCAL_STORE_KEY = "toy_dashboard.taskStore.v1";

// DummyJSON todos 응답 형식 (그쪽 창구 형식)
interface DummyTodo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

interface DummyTodosResponse {
    todos: DummyTodo[];
    total: number;
    skip: number;
    limit: number;
}

// 오늘 날짜 YYYY-MM-DD (커스텀용)
const today = () => new Date().toISOString().slice(0, 10);

type TaskStore = {
    byId: Record<string, Task>;
    localOnlyIds: string[];
    deletedIds: string[];
};

function loadTaskStore(): TaskStore {
    try {
        const raw = localStorage.getItem(TASK_LOCAL_STORE_KEY);
        if (!raw) return { byId: {}, localOnlyIds: [], deletedIds: [] };
        const parsed = JSON.parse(raw) as TaskStore;
        return {
            byId: parsed.byId ?? {},
            localOnlyIds: parsed.localOnlyIds ?? [],
            deletedIds: parsed.deletedIds ?? [],
        };
    } catch {
        return { byId: {}, localOnlyIds: [], deletedIds: [] };
    }
}

function saveTaskStore(store: TaskStore) {
    localStorage.setItem(TASK_LOCAL_STORE_KEY, JSON.stringify(store));
}

function upsertLocalTask(task: Task, options?: { localOnly?: boolean }) {
    const store = loadTaskStore();
    store.byId[task.id] = task;
    if (options?.localOnly) {
        if (!store.localOnlyIds.includes(task.id))
            store.localOnlyIds.unshift(task.id);
    }
    // 수정/생성되면 삭제 목록에서 제거
    store.deletedIds = store.deletedIds.filter((x) => x !== task.id);
    saveTaskStore(store);
}

function markDeleted(id: string) {
    const store = loadTaskStore();
    delete store.byId[id];
    store.localOnlyIds = store.localOnlyIds.filter((x) => x !== id);
    if (!store.deletedIds.includes(id)) store.deletedIds.push(id);
    saveTaskStore(store);
}

// 새 ID 생성: 로컬 스토어와 DummyJSON 기본 범위(1-30)를 고려하여 최대 ID + 1
function generateNextId(): string {
    const store = loadTaskStore();
    const localIds = Object.keys(store.byId).map((id) => Number(id) || 0);
    const maxLocalId = localIds.length > 0 ? Math.max(...localIds) : 0;
    // DummyJSON 기본 데이터는 보통 1-30 범위이므로, 최소 30 이상에서 시작
    const baseId = Math.max(maxLocalId, 30);
    return String(baseId + 1);
}

// DummyJSON 형식 → 우리 Task 형식으로 변환
// list / view / edit 모두 같은 규칙 적용 → 화면 값 일치
// DummyJSON은 todo/userId만 신뢰 가능한 저장값이므로, title은 todo를 그대로 사용
function mapDummyTodoToTask(d: DummyTodo): Task {
    const status: TaskStatus = d.completed ? "done" : "request";
    const title = d.todo;
    // 작성자/담당자는 서버에 별도 필드가 없어서 userId 기반으로 커스텀 표시
    const authorId = `작성자${d.userId}`;
    const assigneeId = `팀원${d.userId}`;
    const createdDay = today(); // 커스텀 (서버에 없음, 오늘 날짜)
    return {
        id: String(d.id),
        title,
        createdDay,
        doneDay: "", // 서버에 없음, view에서 빈 값이면 "-"로 표시
        description: d.todo,
        status,
        importStatus: "medium",
        authorId,
        assigneeId,
    };
}

// 우리 Task → DummyJSON 요청 body 형식 (create/update용)
function mapTaskToDummyBody(task: {
    title: string;
    status?: TaskStatus;
    authorId?: string;
}) {
    const authorDigits = (task.authorId ?? "").match(/\d+/)?.[0];
    return {
        todo: task.title,
        completed: task.status === "done",
        // authorId가 "3" 또는 "작성자3" 형태여도 userId로 변환
        userId: parseInt(authorDigits ?? task.authorId ?? "1", 10) || 1,
    };
}

// 공통 요청 함수 (우리 창구가 그쪽 창구에 요청 보내는 곳)
async function request<T>(
    path: string,
    options?: { method?: string; body?: object },
): Promise<T> {
    const url = `${BASE_URL}${path}`;
    const res = await fetch(url, {
        method: options?.method ?? "GET",
        headers: { "Content-Type": "application/json" },
        ...(options?.body && { body: JSON.stringify(options.body) }),
    });
    if (!res.ok) {
        throw new Error(`API 오류: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<T>;
}

// —— 우리 창구가 노출하는 함수들 ——

export async function getTasks(limit = 30, skip = 0): Promise<Task[]> {
    const data = await request<DummyTodosResponse>(
        `/todos?limit=${limit}&skip=${skip}`,
    );
    const store = loadTaskStore();
    const base = data.todos.map((d) => mapDummyTodoToTask(d));
    const merged = base
        .filter((t) => !store.deletedIds.includes(t.id))
        .map((t) => store.byId[t.id] ?? t);

    // 로컬에서 만든 업무(localOnly)도 목록에 보여주기
    const localOnly = store.localOnlyIds
        .map((id) => store.byId[id])
        .filter(Boolean);
    
    // ID 내림차순 정렬 (최신이 위로)
    const all = [...localOnly, ...merged];
    return all.sort((a, b) => Number(b.id) - Number(a.id));
}

export async function getTaskById(id: string): Promise<Task | null> {
    const store = loadTaskStore();
    if (store.deletedIds.includes(id)) return null;
    if (store.byId[id]) return store.byId[id];
    try {
        const d = await request<DummyTodo>(`/todos/${id}`);
        const base = mapDummyTodoToTask(d);
        return store.byId[id] ?? base;
    } catch {
        return null;
    }
}

export async function createTask(task: Omit<Task, "id">): Promise<Task> {
    const body = mapTaskToDummyBody(task);
    // API 호출 (DummyJSON은 실제 저장 안 됨)
    await request<DummyTodo & { id: number }>("/todos/add", {
        method: "POST",
        body,
    });
    // 로컬에서 고유 ID 생성 (기존 최대 ID + 1)
    const newId = generateNextId();
    const createdDay = task.createdDay?.trim() ? task.createdDay : today();
    const doneDay = task.doneDay?.trim() ? task.doneDay : "";
    const created: Task = {
        id: newId,
        title: task.title,
        description: task.description ?? task.title,
        status: task.status ?? "request",
        authorId: task.authorId ?? "작성자",
        assigneeId: task.assigneeId ?? "담당자",
        createdDay,
        doneDay,
        importStatus: task.importStatus ?? "medium",
    };
    upsertLocalTask(created, { localOnly: true });
    return created;
}

export async function updateTask(
    id: string,
    data: Partial<
        Pick<
            Task,
            | "title"
            | "status"
            | "authorId"
            | "assigneeId"
            | "description"
            | "createdDay"
            | "doneDay"
            | "importStatus"
        >
    >,
): Promise<Task> {
    const store = loadTaskStore();
    const isLocalOnly = store.localOnlyIds.includes(id);
    const existing = store.byId[id];

    // 로컬에서만 생성된 업무는 API 호출 없이 로컬스토리지만 업데이트
    if (isLocalOnly && existing) {
        const createdDay = data.createdDay?.trim()
            ? data.createdDay
            : existing.createdDay;
        const doneDay =
            data.doneDay !== undefined
                ? data.doneDay?.trim()
                    ? data.doneDay
                    : ""
                : (existing.doneDay ?? "");
        const next: Task = {
            ...existing,
            ...(data.title !== undefined ? { title: data.title } : null),
            ...(data.status !== undefined ? { status: data.status } : null),
            ...(data.description !== undefined
                ? { description: data.description }
                : null),
            createdDay,
            doneDay,
            ...(data.importStatus !== undefined
                ? { importStatus: data.importStatus }
                : null),
            ...(data.authorId !== undefined
                ? { authorId: data.authorId }
                : null),
            ...(data.assigneeId !== undefined
                ? { assigneeId: data.assigneeId }
                : null),
        };
        upsertLocalTask(next, { localOnly: true });
        return next;
    }

    // 서버에 존재하는 업무는 API 호출 후 로컬스토리지 업데이트
    const body = mapTaskToDummyBody({
        title: data.title ?? "",
        status: data.status,
        authorId: data.authorId ?? "1",
    });
    const d = await request<DummyTodo>(`/todos/${id}`, {
        method: "PUT",
        body,
    });
    const base = mapDummyTodoToTask(d);
    const createdDay = data.createdDay?.trim()
        ? data.createdDay
        : base.createdDay;
    const doneDay =
        data.doneDay !== undefined
            ? data.doneDay?.trim()
                ? data.doneDay
                : ""
            : (base.doneDay ?? "");
    const next: Task = {
        ...base,
        id,
        ...(data.title !== undefined ? { title: data.title } : null),
        ...(data.status !== undefined ? { status: data.status } : null),
        ...(data.description !== undefined
            ? { description: data.description }
            : null),
        createdDay,
        doneDay,
        ...(data.importStatus !== undefined
            ? { importStatus: data.importStatus }
            : null),
        ...(data.authorId !== undefined ? { authorId: data.authorId } : null),
        ...(data.assigneeId !== undefined
            ? { assigneeId: data.assigneeId }
            : null),
    };
    upsertLocalTask(next);
    return next;
}

// API 필드에는 없지만 클라이언트에서만 관리하는 상태(status)만
// 로컬스토어에 바로 반영하고 싶을 때 사용하는 헬퍼
export function updateTaskStatusLocal(id: string, status: TaskStatus): void {
    const store = loadTaskStore();
    const existing = store.byId[id];
    if (!existing) return;
    const next: Task = { ...existing, status };
    upsertLocalTask(next);
}

export async function deleteTask(id: string): Promise<void> {
    const store = loadTaskStore();
    const isLocalOnly = store.localOnlyIds.includes(id);

    // 로컬에서만 생성된 업무는 API 호출 없이 바로 삭제
    if (!isLocalOnly) {
        await request<{ id: number; isDeleted: boolean }>(`/todos/${id}`, {
            method: "DELETE",
        });
    }
    markDeleted(id);
}
