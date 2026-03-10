import type { Task, TaskStatus } from "./task";

// 서버 = DummyJSON API
const BASE_URL = "https://dummyjson.com";

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

// DummyJSON 형식 → 우리 Task 형식으로 변환
function mapDummyTodoToTask(d: DummyTodo): Task {
    const status: TaskStatus = d.completed ? "done" : "todo";
    const userId = String(d.userId);
    return {
        id: String(d.id),
        title: d.todo,
        createdDay: "", // DummyJSON에 없음
        description: d.todo,
        status,
        importStatus: "medium",
        authorId: userId,
        assigneeId: userId,
    };
}

// 우리 Task → DummyJSON 요청 body 형식 (create/update용)
function mapTaskToDummyBody(task: { title: string; status?: TaskStatus; authorId?: string }) {
    return {
        todo: task.title,
        completed: task.status === "done",
        userId: parseInt(task.authorId || "1", 10) || 1,
    };
}

// 공통 요청 함수 (우리 창구가 그쪽 창구에 요청 보내는 곳)
async function request<T>(
    path: string,
    options?: { method?: string; body?: object }
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
        `/todos?limit=${limit}&skip=${skip}`
    );
    return data.todos.map(mapDummyTodoToTask);
}

export async function getTaskById(id: string): Promise<Task | null> {
    try {
        const d = await request<DummyTodo>(`/todos/${id}`);
        return mapDummyTodoToTask(d);
    } catch {
        return null;
    }
}

export async function createTask(
    task: Omit<Task, "id">
): Promise<Task> {
    const body = mapTaskToDummyBody(task);
    const d = await request<DummyTodo & { id: number }>("/todos/add", {
        method: "POST",
        body,
    });
    return mapDummyTodoToTask(d);
}

export async function updateTask(
    id: string,
    data: Partial<Pick<Task, "title" | "status">>
): Promise<Task> {
    const body = mapTaskToDummyBody({
        title: data.title ?? "",
        status: data.status,
        authorId: "1",
    });
    const d = await request<DummyTodo>(`/todos/${id}`, {
        method: "PUT",
        body,
    });
    return mapDummyTodoToTask(d);
}

export async function deleteTask(id: string): Promise<void> {
    await request<{ id: number; isDeleted: boolean }>(`/todos/${id}`, {
        method: "DELETE",
    });
}
