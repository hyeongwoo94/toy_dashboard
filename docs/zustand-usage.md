# Zustand 사용법 정리

이 문서는 이 프로젝트에서 Zustand 스토어를 어떻게 채우고 사용하는지 참고용으로 정리한 것이다.

---

## 1. 한 줄 요약

**스토어 = `create( ( set ) => ({ state, actions }) )`**  
안에 **상태**와 **상태를 바꾸는 함수**를 넣고, 컴포넌트에서는 `useStore(...)`로 가져다 쓴다.

---

## 2. 스토어 만드는 법

- **`create`** 한 번에 스토어 하나.
- 인자로 **함수**를 넘기고, 그 함수의 인자로 **`set`** (그리고 필요하면 **`get`**)을 받는다.
- **return 하는 객체**가 곧 “스토어 내용” = state + actions.

```ts
import { create } from 'zustand'

export const useXXXStore = create((set) => ({
  // 1) state
  // 2) actions (set으로 state 갱신)
}))
```

---

## 3. State 넣기

- 그냥 **객체 프로퍼티**로 넣으면 된다.
- 예: `tasks: []`, `isLoading: false`, `selectedId: null` …

---

## 4. Actions 넣기 (상태 바꾸기)

- **`set`**이 “스토어 상태를 바꾸는 함수”다.
- `set( { key: value } )` → 해당 key만 바꾸고 나머지는 유지.
- `set((state) => ({ ... }))` → 이전 state를 보고 새 state를 계산할 때 사용.

액션 함수 안에서 `set`을 호출하면 스토어가 갱신된다.

---

## 5. 컴포넌트에서 쓰기

- **일부만 구독**: `const tasks = useXXXStore((state) => state.tasks)` → `tasks`만 바뀔 때만 리렌더.
- **액션만 쓰기**: `const addTask = useXXXStore((state) => state.addTask)`

필요한 것만 `(state) => state.필드` 형태로 골라 쓰면 된다.

---

## 6. 이 프로젝트 기준 예시: taskStore

아래는 **태스크 스토어**를 채운 예시다. `Task` 타입과 `TaskState`, `TaskActions` 구조를 그대로 두고, `create` 안에 구현만 넣은 형태다.

### 6.1 타입·스토어 정의 (참고: `src/features/task/`)

```ts
// task.ts
export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type TaskImporStatus = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  createdDay: string
  doneDay: string
  description: string
  importStatus: TaskImporStatus
  status: TaskStatus
  authorId: string
  assigneeId: string
}
```

```ts
// taskStore.ts
import { create } from 'zustand'
import type { Task } from './task'

interface TaskState {
  tasks: Task[]
}

interface TaskActions {
  addTask: (task: Task) => void
  updateTask: (id: string, update: Partial<Task>) => void
  removeTask: (id: string) => void
}

export const useTaskStore = create<TaskState & TaskActions>((set) => ({
  // state
  tasks: [],

  // actions
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (id, update) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...update } : t
      ),
    })),

  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
}))
```

### 6.2 컴포넌트에서 사용 예시

```tsx
// 태스크 목록만 구독 (tasks 변경 시에만 리렌더)
const tasks = useTaskStore((state) => state.tasks)
const addTask = useTaskStore((state) => state.addTask)
const updateTask = useTaskStore((state) => state.updateTask)
const removeTask = useTaskStore((state) => state.removeTask)

// 사용
addTask(newTask)
updateTask('task-id', { status: 'done' })
removeTask('task-id')
```

```tsx
// 여러 개를 한 번에 가져올 때 (같은 스토어면 한 번에 구독해도 됨)
const { tasks, addTask } = useTaskStore((state) => ({
  tasks: state.tasks,
  addTask: state.addTask,
}))
```

---

## 7. 스토어 채우는 순서

1. **state**: 이 스토어에 “무슨 데이터를 둘지” (데이터설계.md에 맞춰).
2. **actions**: 그 데이터를 “어떤 일할 때 어떻게 바꿀지” (추가/수정/삭제/선택 등).
3. **타입**: `Task`, `User` 등은 `types` 또는 feature 내부 타입에서 가져와 state·인자에 붙인다.

---

## 8. 공식 문서

- [Zustand 공식 문서](https://docs.pmnd.rs/zustand)
- “Getting started” → “Creating a store” / “Using the store” 순서로 보면 위 내용과 같은 패턴이 코드와 함께 나온다.

---

*이 문서는 프로젝트 참고용이며, 실제 코드는 `src/features/*/` 내 스토어와 타입을 우선한다.*
