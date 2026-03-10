# Task CRUD 복습 노트 (TaskList 연결 → View/Edit 분기 → localStorage로 수정 반영)

이 문서는 “내가 어떤 순서로 무엇을 연결했고, 각 파일이 무슨 역할인지”를 **나중에 혼자 복습**할 수 있게 정리한 노트입니다.  
프로젝트 기준: Vite + React + TypeScript + React Router + Zustand + DummyJSON.

---

## 0. 목표(당시 하고 싶었던 것)

- **목록 페이지**(`/task`): API로 Task 목록을 가져와 테이블에 뿌린다.
- **상세 페이지**(`/task/view/:id`): URL의 `id`로 단건 조회해서 보여준다.
- **수정/등록 페이지**(`/task/edit` / `/task/edit/:id`):
  - `/task/edit`는 “등록(create)”
  - `/task/edit/:id`는 “수정(update)”
- **수정이 실제로 반영된 것처럼 보이게 하기**:
  - DummyJSON은 update가 영구 반영이 안 될 수 있어서
  - create/update/delete 결과를 `localStorage`에 저장하고
  - 이후 조회(get) 시 항상 merge해서 화면에 일관되게 보여준다.

---

## 1. 라우팅: URL에 따라 컴포넌트를 다르게 보여주기

파일: `src/App.tsx`

- `/task`는 레이아웃(`SubPageLayout`) 아래에 중첩 라우트로 구성
- 아래 4개가 핵심
  - `index` → `TaskList`
  - `edit` → `TaskEdit` (등록)
  - `edit/:id` → `TaskEdit` (수정)
  - `view/:id` → `TaskView`

포인트:
- **같은 TaskEdit 컴포넌트를 두 경로에서 재사용**하고, 내부에서 `useParams().id` 유무로 create/update를 분기한다.

---

## 2. 데이터 “창구” 만들기: `src/features/task/api.ts`

여기서의 핵심은 2가지입니다.

### 2-1. 서버 응답을 우리 타입(Task)으로 “변환”한다

DummyJSON todo 한 건은 대략 이런 형태:
- `id`, `todo`, `completed`, `userId`

우리 앱은 이런 형태(Task)를 쓰고 싶음:
- `id`, `title`, `description`, `status`, `createdDay`, `doneDay`, `authorId`, `assigneeId`, `importStatus` ...

그래서 `mapDummyTodoToTask()`로 변환한다.

- `title`은 `todo`를 그대로 사용 (저장된 “텍스트”가 바로 todo라서)
- `status`는 `completed`를 보고 `"done"`/`"request"`로 변환
- `authorId/assigneeId`는 서버에 구분 필드가 없어서 `userId`로 커스텀 표시(예: `"작성자3"`, `"담당자3"`)

### 2-2. create/update/delete가 “영구 반영”이 안 되는 문제를 localStorage로 보완한다

DummyJSON이 데모 API라서 생기는 문제:
- PUT 성공 → view로 돌아가서 GET → 값이 원복되어 보일 수 있음

해결:
- `localStorage`에 “내가 만든 최신 Task 상태”를 저장해 두고
- 조회(get)에서 항상 서버값 + 로컬값을 **merge**해서 반환

#### (1) localStorage 저장 형태(TaskStore)

- `byId`: `{ [id]: Task }`
  - id별 최신 스냅샷
- `localOnlyIds`: `string[]`
  - 서버 목록에 없어도(혹은 서버가 유지 안 해도) 로컬에서 만든 업무를 목록에 보여주기 위한 id 배열
- `deletedIds`: `string[]`
  - 삭제된 업무는 목록/상세에서 숨기기 위한 id 배열

#### (2) create/update/delete 시 처리

- `createTask(task)`
  - 서버에 POST는 보내지만(데모), **결과 Task를 localStorage에도 저장**
  - `localOnlyIds`에 id를 넣어 목록에서 보이게 함

- `updateTask(id, patch)`
  - 서버에 PUT은 보내지만(데모), **patch를 반영한 최종 Task를 localStorage에 저장**
  - 이후 `getTaskById/getTasks`는 이 로컬 값을 우선해서 보여줌

- `deleteTask(id)`
  - 서버 DELETE는 보내지만(데모), 로컬에서도 `deletedIds`에 넣어서 숨김 처리

#### (3) 조회 시 merge 우선순위(매우 중요)

- `getTaskById(id)`
  - deletedIds면 `null`
  - byId에 있으면 그걸 반환(로컬 최우선)
  - 없으면 서버 GET 후, byId가 생겼으면 byId 우선, 아니면 서버값

- `getTasks()`
  - 서버 목록(base)
  - deletedIds 제거
  - byId로 덮어쓰기(같은 id는 로컬이 우선)
  - localOnlyIds의 Task를 맨 앞에 붙여서 반환

이 규칙 때문에 list/view/edit이 “같은 데이터”를 보는 것처럼 유지된다.

---

## 3. 목록 연결: `TaskList` + `useTasks`

### 3-1. `useTasks` (목록 데이터를 가져오는 훅)

파일: `src/pages/task/features/useTasks.ts`

- 역할: `getTasks()`를 호출해서 `tasks`, `isLoading` 같은 상태를 만들어 `TaskList`에게 제공
- 장점: 페이지 컴포넌트(TaskList)에서 fetch 로직이 사라져서 화면 코드가 깔끔해짐

### 3-2. `TaskList` (목록 UI)

파일: `src/pages/task/TaskList.tsx`

- `useTasks()`로 목록을 받아와서 테이블 row로 변환
- row 클릭(또는 링크) 시 `/task/view/:id`로 이동
- “업무 등록” 버튼은 `/task/edit`로 이동

포인트:
- 목록은 항상 `getTasks()`가 반환한 “merge된 최종 Task[]”를 사용한다.

---

## 4. 상세(View): `TaskView`

파일: `src/pages/task/TaskView.tsx`

흐름:
- URL에서 `id`를 가져온다: `useParams().id`
- `getTaskById(id)`로 단건 조회
- 로딩 처리(스피너)
- 값이 없으면 “없음” 메시지
- 있으면 읽기 전용 UI로 렌더

포인트:
- `getTaskById`가 localStorage의 byId를 우선하기 때문에
  - edit에서 수정한 내용이 view에서 “바뀐 걸로” 보인다.

---

## 5. 등록/수정(Edit): `TaskEdit`

파일: `src/pages/task/TaskEdit.tsx`

### 5-1. create vs update 분기 (가장 중요한 분기)

- `const { id } = useParams()`
- **id가 있으면 수정**:
  - mount 시 `getTaskById(id)`로 초기 값 채우기
  - 저장 시 `updateTask(id, payload)` 호출
- **id가 없으면 등록**:
  - 초기 로딩 없이 빈 폼
  - 저장 시 `createTask(payload)` 호출

### 5-2. 왜 “payload 전체”를 update에 넘겨야 했나?

처음엔 update 시 `title/status`만 넘겼는데,
사용자는 작성자/담당자/내용/날짜/중요도도 같이 수정할 수 있음.

그래서 update 때도 폼에 있는 전체 값을 patch로 넘겨서,
localStorage에 저장되는 “최종 Task 스냅샷”이 폼과 동일해지도록 맞춘다.

---

## 6. 내가 헷갈렸던 지점 정리(체크리스트)

- **list/view/edit 값이 왜 달랐지?**
  - “목록에서만 커스텀 매핑” 같은 규칙이 있으면 상세/수정과 값이 달라질 수 있음
  - 해결: 변환 규칙(map 함수)을 한 군데로 모으고 list/view/edit에서 공통으로 쓰기

- **수정이 왜 안 먹는 것처럼 보였지?**
  - DummyJSON이 PUT을 영구 저장하지 않을 수 있음
  - 해결: localStorage에 최신 상태 저장 + 조회 시 merge

- **URL에 따라 왜 같은 컴포넌트를 두 번 썼지?**
  - `/task/edit`(등록)과 `/task/edit/:id`(수정)을 같은 폼 컴포넌트로 재사용하고
  - `id` 유무로 create/update만 갈라서 유지보수 비용을 줄이기 위해서

---

## 7. 다음 확장 아이디어(복습 후 하면 좋은 것)

- 진짜 백엔드가 생기면:
  - localStorage merge를 제거하거나
  - “서버가 진실(source of truth)”이 되게 데이터 흐름 재설계
- 목록:
  - 필터/정렬/페이지네이션
  - 검색어 기반 필터
- 편집 UX:
  - 저장 성공/실패 토스트
  - dirty 체크(변경사항 있을 때만 저장 활성화)

