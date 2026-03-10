# Task API 모듈 명세서

이 문서는 `src/features/task/api.ts`를 보면서 읽으면 이해하기 쉽게 쓰여 있습니다.  
**API 모듈 = 우리 앱이 서버(DummyJSON)에게 요청을 보내기 위한 "우리 쪽 창구"**라는 것까지 이해했다고 가정하고, 그 다음 단계부터 차근차근 적습니다.

---

## 1. 창구를 만들려면 뭐가 필요한가?

우리 창구(`api.ts`)가 할 일은 세 가지입니다.

1. **서버 주소를 알고 있어야 한다** → 어디로 요청을 보낼지
2. **요청을 보내는 방법을 한 곳에서 처리한다** → fetch를 매번 쓰지 않고, 공통 함수로
3. **서버와 말이 통하도록 형식을 맞춘다** → 서버는 자기 형식, 우리 앱은 Task 형식 → 중간에서 변환

그래서 `api.ts`에는 아래 네 가지가 들어갑니다.

| 필요한 것 | api.ts에서 하는 일 |
|-----------|---------------------|
| 서버 주소 | `BASE_URL` 상수 |
| 서버가 주는/받는 형식 정의 | `DummyTodo`, `DummyTodosResponse` 타입 |
| 우리 형식으로 바꾸기 | `mapDummyTodoToTask`, `mapTaskToDummyBody` 함수 |
| 공통으로 요청 보내기 | `request()` 함수 |
| 창구에서 노출할 기능 | `getTasks`, `getTaskById`, `createTask`, `updateTask`, `deleteTask` |

이걸 **어떤 순서로, 어떤 생각으로** 작성했는지는 3장에서 api.ts 흐름대로 적습니다.

---

## 2. DummyJSON(서버)이랑 어떻게 연결되는가?

연결은 **"우리 창구가 DummyJSON URL로 fetch를 보내는 것"** 하나입니다.

- **DummyJSON 서버**  
  - 주소: `https://dummyjson.com`  
  - 예: `https://dummyjson.com/todos` → 할 일 목록, `https://dummyjson.com/todos/1` → id가 1인 할 일 하나

- **우리 창구(api.ts)**  
  - `BASE_URL = "https://dummyjson.com"` 으로 주소를 고정해 두고  
  - `request("/todos")` 를 호출하면 → 실제로는 `fetch("https://dummyjson.com/todos")` 가 실행됨  
  - 즉, **경로(path)만 넘기면 BASE_URL과 합쳐서 서버에 요청**하는 구조

그래서 "연결"이라고 하면:

1. `BASE_URL`에 DummyJSON 주소를 넣고  
2. 모든 요청을 `request(path, options)` 한 곳에서 처리하고  
3. `getTasks()` 같은 함수는 그냥 `request("/todos?limit=30")` 처럼 **경로와 메서드만 정해 주면**  
4. 실제 네트워크 요청은 `request` → `fetch(BASE_URL + path)` 로 나간다  

라고 보면 됩니다. **우리 창구가 DummyJSON 한 군데만 바라보고, 그쪽으로만 요청을 보내는 구조**입니다.

---

## 3. api.ts를 쓸 때 어떤 생각으로 작성했는지 (순서대로)

아래는 **파일 위에서부터 아래로**, "왜 이걸 넣었는지, 어떤 순서로 생각했는지"를 적은 것입니다.  
`src/features/task/api.ts` 를 열어 두고 해당 구간을 보면서 읽으면 됩니다.

---

### 3-1. 맨 위: 우리 타입 가져오기 (1줄)

```ts
import type { Task, TaskStatus } from "./task";
```

- **생각:** 우리 창구가 **밖으로 줄 값**은 전부 `Task` 형태로 통일하고 싶다.  
  그래서 서버 형식이 아니라 **우리 프로젝트의 Task 타입**을 맨 먼저 가져온다.
- **역할:** 나중에 함수 반환 타입이나 변환 결과를 `Task`, `Task[]` 로 쓰기 위함.

---

### 3-2. BASE_URL (3~4줄)

```ts
const BASE_URL = "https://dummyjson.com";
```

- **생각:** "요청을 보낼 서버가 어디인가?" → 한 번만 정해 두고, 앞으로 모든 요청은 이 주소 + 경로로 보낸다.
- **역할:** 나중에 우리 백엔드로 바꿀 때도 이 한 줄만 바꾸면 되게 하려고 상수로 둠.

---

### 3-3. DummyJSON 쪽 형식 정의 (6~18줄)

```ts
interface DummyTodo { id: number; todo: string; completed: boolean; userId: number; }
interface DummyTodosResponse { todos: DummyTodo[]; total: number; skip: number; limit: number; }
```

- **생각:**  
  - 서버가 **뭘 주는지**를 코드로 적어 두지 않으면, `res.json()` 결과를 쓸 때 필드 이름을 틀리기 쉽다.  
  - DummyJSON 문서를 보면 "한 개 todo"는 `id, todo, completed, userId`, "목록"은 `todos` 배열 + `total, skip, limit` 이라고 되어 있음.  
  - 그래서 **서버가 주는 그대로**의 모양을 `DummyTodo`, `DummyTodosResponse` 로 정의해 둔다.
- **역할:**  
  - `request<DummyTodo>(...)` 처럼 제네릭으로 "이 경로는 이 타입으로 올 거야"라고 명시할 수 있음.  
  - 나중에 서버 응답이 바뀌면 여기만 고치면 됨.

---

### 3-4. 서버 형식 → 우리 Task 형식 (20~34줄)

```ts
function mapDummyTodoToTask(d: DummyTodo): Task { ... }
```

- **생각:**  
  - DummyJSON은 `id`, `todo`, `completed`, `userId` 만 준다.  
  - 우리 Task는 `id`, `title`, `createdDay`, `description`, `status`, `importStatus`, `authorId`, `assigneeId` 등을 쓴다.  
  - 필드 이름도 다르고(`todo` vs `title`), 값 형태도 다름(`completed: boolean` vs `status: 'todo'|'done'`).  
  - 그래서 **"서버에서 받은 한 건(DummyTodo)을 우리 Task 한 건으로 바꾸는 함수"**를 따로 둔다.
- **구체적으로 한 것:**  
  - `d.todo` → `title`  
  - `d.completed` → `true`면 `status: 'done'`, 아니면 `'todo'`  
  - `d.userId` → `authorId`, `assigneeId` 에 둘 다 넣음 (서버에는 담당자/작성자 구분이 없어서)  
  - `createdDay`, `doneDay` 는 DummyJSON에 없으니 `createdDay: ""` 등 기본값  
  - `importStatus` 도 없으니 `"medium"` 고정
- **역할:**  
  - 서버에서 받은 데이터는 **이 함수를 한 번 거친 뒤**에만 앱 안에서 쓴다.  
  - 그래서 화면/스토어는 항상 `Task` 타입만 보면 됨.

---

### 3-5. 우리 Task → 서버가 받는 body 형식 (36~43줄)

```ts
function mapTaskToDummyBody(task: { title: string; status?: TaskStatus; authorId?: string }) { ... }
```

- **생각:**  
  - 우리는 "제목, 상태, 작성자" 같은 걸로 Task를 만들지만,  
  - DummyJSON의 POST/PUT은 `todo`, `completed`, `userId` 를 받는다.  
  - 그래서 **우리 형식 → 서버 형식**으로 바꿔 주는 함수가 따로 필요함.
- **구체적으로 한 것:**  
  - `task.title` → `todo`  
  - `task.status === 'done'` → `completed: true` / 아니면 `false`  
  - `task.authorId` → 숫자로 바꿔서 `userId` (없으면 1)
- **역할:**  
  - `createTask`, `updateTask` 에서 **body를 넣을 때만** 이 함수를 쓴다.  
  - 우리는 Task로 생각하고, 실제로 보낼 때만 DummyJSON 형식으로 변환.

---

### 3-6. 공통 요청 함수 request (45~59줄)

```ts
async function request<T>(path: string, options?: { method?: string; body?: object }): Promise<T> { ... }
```

- **생각:**  
  - getTasks, getTaskById, createTask … 전부 "같은 서버(BASE_URL)로 fetch 보내고, JSON 파싱하고, 실패하면 throw" 하는 패턴이 반복됨.  
  - 이걸 **한 함수에 모으면** 주소/헤더/에러 처리를 한 곳에서만 관리할 수 있음.
- **하는 일:**  
  1. `url = BASE_URL + path` 로 최종 URL 만듦  
  2. `fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body? })` 호출  
  3. `res.ok`가 false면 (404, 500 등) `throw new Error(...)`  
  4. 성공하면 `res.json()` 으로 파싱해서 `Promise<T>` 반환
- **제네릭 `<T>`:**  
  - "이번 요청의 응답 타입"을 호출하는 쪽에서 지정하게 함.  
  - 예: `request<DummyTodosResponse>('/todos')` → 반환 타입이 `DummyTodosResponse`.
- **역할:**  
  - **"우리 창구가 서버(그쪽 창구)에 실제로 요청을 보내는 유일한 통로"**라고 보면 됨.  
  - DummyJSON과의 "연결"은 전부 이 함수 안의 `fetch` 한 줄에서 일어남.

---

### 3-7. getTasks (64~69줄)

```ts
export async function getTasks(limit = 30, skip = 0): Promise<Task[]> { ... }
```

- **생각:**  
  - "목록 가져오기"는 우리 창구가 **가장 먼저 노출할 함수** 중 하나.  
  - DummyJSON은 `GET /todos?limit=30&skip=0` 형태로 페이지네이션을 지원함.
- **하는 일:**  
  1. `request<DummyTodosResponse>('/todos?limit=...&skip=...')` 로 서버에 요청  
  2. 응답의 `data.todos` 배열을 가져와서  
  3. 각 항목을 `mapDummyTodoToTask` 로 Task로 바꾼 뒤  
  4. `Task[]` 로 반환
- **역할:**  
  - 화면/훅은 "getTasks() 부르면 Task[] 온다"만 알면 되고,  
  - 실제로는 DummyJSON `/todos` 를 부르고 우리 형식으로 바꿔 주는 건 api.ts 안에서만 처리.

---

### 3-8. getTaskById (71~78줄)

```ts
export async function getTaskById(id: string): Promise<Task | null> { ... }
```

- **생각:**  
  - "id로 하나만 가져오기" → DummyJSON은 `GET /todos/:id`.  
  - 없는 id면 서버가 404를 주고, `request`가 throw함.  
  - 그걸 그대로 두면 앱에서 에러로 터지니까, **try/catch로 잡아서 null을 반환**하는 게 나을 수 있음.
- **하는 일:**  
  1. `request<DummyTodo>('/todos/' + id)` 호출  
  2. 성공하면 `mapDummyTodoToTask(d)` 로 Task로 바꿔서 반환  
  3. catch 되면 (404 등) `null` 반환
- **역할:**  
  - "있으면 Task, 없으면 null" 로 통일해서, 호출하는 쪽에서 분기하기 쉽게 함.

---

### 3-9. createTask (80~89줄)

```ts
export async function createTask(task: Omit<Task, "id">): Promise<Task> { ... }
```

- **생각:**  
  - "새 Task 만들기" → id는 서버가 만들어 주니까, 우리는 **id 빼고** 보낸다.  
  - DummyJSON은 `POST /todos/add` 에 body로 `{ todo, completed, userId }` 를 보냄.
- **하는 일:**  
  1. `mapTaskToDummyBody(task)` 로 우리 Task → 서버 body 형식으로 변환  
  2. `request('/todos/add', { method: 'POST', body })` 로 전송  
  3. 서버가 생성된 항목을 돌려주면, 그걸 `mapDummyTodoToTask(d)` 로 Task로 바꿔서 반환
- **Omit<Task, "id">:**  
  - "Task 타입에서 id만 뺀 타입" → 새로 만드는 거라 id는 없고, 나머지 필드만 받는다는 뜻.

---

### 3-10. updateTask (91~105줄)

```ts
export async function updateTask(id: string, data: Partial<Pick<Task, "title" | "status">>): Promise<Task> { ... }
```

- **생각:**  
  - "이 id 걸 일부만 수정" → DummyJSON은 `PUT /todos/:id` 에 body로 `{ todo, completed, userId }` 를 받음.  
  - 우리는 "수정할 필드만" 넘기고 싶으니까 `Partial<Pick<Task, "title" | "status">>` 로 제목/상태만 선택적으로 받음.
- **하는 일:**  
  1. `mapTaskToDummyBody({ title: data.title ?? "", status: data.status, authorId: "1" })` 로 서버 body 만들고  
  2. `request('/todos/' + id, { method: 'PUT', body })` 로 전송  
  3. 응답을 다시 `mapDummyTodoToTask(d)` 로 Task로 바꿔서 반환

---

### 3-11. deleteTask (107~112줄)

```ts
export async function deleteTask(id: string): Promise<void> { ... }
```

- **생각:**  
  - "이 id 건 삭제" → DummyJSON은 `DELETE /todos/:id`.  
  - 삭제는 보통 "성공/실패"만 알면 되니까 반환값은 안 쓰고 `void`로 둠.
- **하는 일:**  
  - `request('/todos/' + id, { method: 'DELETE' })` 한 번 호출.  
  - 실패하면 `request` 안에서 이미 throw 하니까, 성공하면 그냥 끝.

---

## 4. 전체 흐름 한 번에 보기

1. **앱/훅**  
   - `getTasks()`, `getTaskById(id)` 같은 **우리 창구 함수**만 부름.  
   - 인자/반환은 전부 **우리 Task 타입** 기준.

2. **api.ts (우리 창구)**  
   - 그 함수들이 내부에서 `request(path, options)` 를 부름.  
   - 서버에서 오는 건 **DummyTodo / DummyTodosResponse** 로 받고,  
   - **mapDummyTodoToTask / mapTaskToDummyBody** 로 우리 형식 ↔ 서버 형식 변환.  
   - 실제 통신은 **request → fetch(BASE_URL + path)** 한 곳에서만 발생.

3. **DummyJSON (서버)**  
   - `https://dummyjson.com` + `/todos`, `/todos/add`, `/todos/:id` 등으로 요청을 받고,  
   - 자기 형식으로 응답을 줌.  
   - 우리는 그걸 "받아서 Task로 바꿔서 쓰기만" 하면 됨.

정리하면, **"창구를 만들려면 뭐가 필요한지"**, **"뭘 작성해야 하는지"**, **"DummyJSON이랑 어떻게 연결하는지"**는 이 문서와 `api.ts`를 같이 보면 세세하게 따라갈 수 있게 되어 있습니다.  
궁금한 구간이 있으면 해당 줄 번호나 함수 이름을 기준으로 "이 부분만 더 풀어줘"라고 요청하면 됩니다.
