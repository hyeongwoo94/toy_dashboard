# 업무용 태스크 관리 대시보드 (toy_dashboard)

ERP 퍼블리싱 경험을 바탕으로, **퍼블리셔 → 프론트엔드 전환** 학습 목적으로 제작한 React SPA입니다.  
Cursor를 활용해 구현했으며, 폴더 구조·상태 배치·라우팅 설계는 직접 고민한 내용을 [`사이트 설명`](https://toy-dashboard-big-bro-woo.vercel.app/explain) 페이지와 `docs/`에 정리했습니다.

## 배포

- **배포**: https://toy-dashboard-big-bro-woo.vercel.app/

### 테스트 계정

로그인 화면의 **테스트 계정 안내** 팝업에서 계정을 클릭해 바로 로그인할 수 있습니다.

## 기술 스택

- **React 19** + **TypeScript** + **Vite**
- **React Router** — 페이지 라우팅, ProtectedRoute
- **Zustand** — 로그인, 공지, 모달, 토스트 등 전역 상태
- **SCSS** + `theme.css` — 스타일·디자인 토큰
- **DummyJSON** (`/todos`) — 업무 API
- **react-calendar** / **react-datepicker** — 메인 달력, 날짜 입력

## 주요 기능

- 로그인 (mockUsers + localStorage 세션 유지)
- 메인 대시보드 (업무 목록, 달력, 내 업무, 공지 미리보기)
- 업무 CRUD (목록 · 상세 · 등록/수정, 탭/검색/페이지네이션)
- 공지사항 (관리자 등록, 매주 반복, 메인 달력 연동)
- 반응형 헤더 (768px 이하 햄버거 메뉴)
- 사이트 설명 페이지 (폴더 구조·설계 의도 정리)

## 로컬 실행

```bash
npm install
npm run dev
```

```bash
npm run build   # 프로덕션 빌드
npm run preview # 빌드 결과 미리보기
```

## Cursor(AI) 활용 방식

이 프로젝트는 **Cursor**를 개발 도구로 사용해 완성했습니다.  
AI에게 맡긴 것과 제가 직접 판단한 것을 나누어 협업하는 방식으로 진행했습니다.

### 제가 먼저 정한 것

- `pages` / `features` / `components` 폴더 역할과 나누는 기준
- 메인(`main_grid`)과 서브(`sub_layout`) 레이아웃 분리
- 라우팅 구조 (ProtectedRoute, 중첩 라우트, 전역 모달·토스트)
- 업무·공지·로그인 등 화면별 동작 규칙 (권한, 담당자 검증, 반복 공지 등)
- 사이트 설명 페이지에 남길 **설계 의도** (`explainTabs.ts`의 rationale)

### Cursor에게 요청한 것

- 정해진 방향을 바탕으로 **컴포넌트·페이지 뼈대 구현** (예: 로그인 안내 모달, 사이트 설명 탭 UI, 모바일 햄버거 메뉴)
- 기존 코드 패턴에 맞춘 **스타일·라우트 연결**
- 막혔을 때 **개념 설명·구현 방향 힌트** (왜 `main_grid`와 `sub_layout`을 나눴는지 등)

### 협업 방식 (실제 흐름)

1. **요구사항·의도를 먼저 정리** (예: “로그인 전용 팝업, 항상 열림, 닫기 가능”)
2. 방향이 맞는지 **질문·힌트로 확인**한 뒤, 필요할 때만 `제작해줘`로 구현 요청
3. 생성된 코드를 **직접 실행·확인**하고, UI·문구·권한 로직을 수정
4. 왜 이렇게 했는지 **사이트 설명 / docs / README에 문서화**

### 이 경험에서 얻은 점

- AI는 **설계를 대신하지 않고**, 정한 방향을 빠르게 코드로 옮기는 데 유리하다
- 퍼블리싱 경험(레이아웃·반응형·SCSS)이 있으면, AI가 만든 UI도 **기준에 맞게 검토·수정**하기 쉽다
- “무엇을 왜 만들었는지”를 설명할 수 있어야, AI 활용 경험이 포트폴리오가 된다

> 요약: **설계·판단은 본인, 구현 가속·문서 초안은 Cursor** — 이 역할 분담으로 프로젝트를 마쳤습니다.

---

## 프로젝트 개요

업무용 태스크 관리 대시보드입니다.

**필수 기능 (학습 목표)**

- 로그인 mock
- 리스트 CRUD
- 필터/정렬
- 상세 페이지
- 폼 validation
- API 상태 관리

**여기서 중요한 건**

- 폴더 구조 스스로 설계
- 상태 어디에 둘지 고민
- 커스텀 훅 분리
- “왜 이렇게 설계했는지” 문서 작성

---

## 작업 순서 (당시 계획)

```
데이터흐름 설계
실제 시작
- api 모듈 제작
  getTasks / getTask / createTask / updateTask / deleteTask
- task 훅 설계
- 대시보드 최소버전
- crud 붙이기
- 로그인
```

---

## Task 도메인 개념

`task = todo` 로 이해하고 시작했습니다.

**task 속성 예제 (초기 설계)**

```json
{
    "id": "number",
    "title": "string",
    "description": "string",
    "status": "todo | in-progress | done",
    "priority": "low | medium | high",
    "dueDate": "string",
    "createdAt": "string"
}
```

**이 앱의 핵심은 task의 변화이다.**

---

## 설계 메모

### 상태 배치 전략

| 상태                    | 위치                             | 이유                       |
| ----------------------- | -------------------------------- | -------------------------- |
| 로그인 유저 정보        | 전역 (Zustand)                   | 여러 페이지에서 필요       |
| 태스크 리스트           | 커스텀 훅 (`useTasks`)           | CRUD, 필터, 리렌더 최소화  |
| 필터/검색/페이지        | URL 쿼리 + 로컬 state            | 새로고침·공유 시 상태 유지 |
| 상세/등록 폼            | 페이지 내부 state                | 다른 화면에 영향 없음      |
| API 호출 상태 (loading) | `useTasks` 훅 내부               | 재사용 가능, 전역 불필요   |
| 공지 목록               | `useNoticeStore`                 | CRUD + localStorage        |
| 모달/토스트             | `useModalStore`, `useToastStore` | 전역 UI                    |

> 핵심: **전역은 정말 여러 곳에서 쓰일 때만.**  
> 로컬 상태는 **렌더링 범위를 최소화**하여 성능 최적화.

### 커스텀 훅 분리 전략

- **useTasks** → 태스크 목록 조회 + 로딩 상태 + refetch
- **(계획) usePagination** → 페이지네이션 로직 분리 검토
- **(계획) useForm** → input validation + 에러 상태 관리 검토

> 이렇게 분리하면 코드 재사용성 ↑, 테스트 용이

### 문서화 가이드 (4주차 목표)

1. **폴더 구조 설계 이유** → 재사용성 / 유지보수성 / 상태 분리
2. **상태 위치 결정 이유** → 렌더링 최적화 / 전역 vs 로컬
3. **커스텀 훅 분리 이유** → 로직 캡슐화 / 재사용
4. **추가 고민 사항** → API 실패 시 처리, loading 표시 방법 등

---

## 폴더 구조

### 초기 설계 (학습 당시 메모)

```
src/
├─ api/                 # API 호출 모듈
│   └─ tasks.ts
├─ components/          # 재사용 가능한 UI 컴포넌트
├─ hooks/               # 커스텀 훅
├─ pages/
├─ state/               # 전역 상태 관리
└─ utils/
```

### 실제 구현 구조

```
src/
├─ pages/           # 화면 단위 (login, task, notice, main, explain …)
│   └─ */component(s)/  # 해당 페이지 전용 UI
├─ features/        # 도메인 로직·상태·타입·API·목데이터
│   ├─ auth/
│   ├─ task/        # api.ts, task.ts …
│   ├─ notice/
│   ├─ user/
│   └─ Common/      # modalStore, toastStore
├─ components/    # 공통 UI (CommonBtn, CommonModal …)
└─ assets/scss/   # 페이지·기능별 SCSS
```

---

## 한 줄 요약

> 폴더 구조는 재사용성과 확장성을 고려하고, 상태는 최소한의 범위로 배치하며, 커스텀 훅으로 로직을 캡슐화하고, 문서화로 설계 이유를 명확히 한다.

---

## API 참고

- 업무 API: [DummyJSON todos](https://dummyjson.com/docs/todos)
- (초기 검토) [koreandummyjson todos](https://koreandummyjson.site/docs/todos)

## 관련 문서

- `docs/` — 작업 히스토리, 로그인 흐름, Zustand, 페이지네이션 등
- 배포 사이트 **사이트 설명** 메뉴 — 파일구조·기능별 구현 정리
