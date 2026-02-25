260225
vite + react 설치
scss설치
src/
├─ api/                 # API 호출 모듈
│   └─ tasks.ts
├─ components/          # 재사용 가능한 UI 컴포넌트
│   ├─ Button/
│   ├─ Input/
│   └─ Modal/
├─ hooks/               # 커스텀 훅
│   ├─ useTasks.ts      # 태스크 CRUD + 상태 관리
│   ├─ usePagination.ts # 필터/정렬용 훅
│   └─ useForm.ts       # 폼 validation 훅
├─ pages/
│   ├─ Login.tsx
│   ├─ Dashboard/
│   │   ├─ TaskList.tsx
│   │   └─ TaskDetail.tsx
├─ state/               # 전역 상태 관리 (Context, Zustand 등)
│   └─ tasksState.ts
└─ utils/               # 공통 유틸 함수
└─ validators.ts

### 상태 배치 전략

| 상태 | 위치 | 이유 |
| --- | --- | --- |
| 로그인 유저 정보 | 전역(Context / Zustand) | 여러 페이지에서 필요 |
| 태스크 리스트 | 커스텀 훅(useTasks) + 전역 필요 시 context | CRUD, 필터/정렬, 리렌더 최소화 |
| 필터/정렬 조건 | useTasks 내 로컬 상태 | 리스트 렌더링에만 영향 |
| 상세 페이지 form | TaskDetail 내부 state | 다른 곳 영향 없음 |
| API 호출 상태(loading/error) | useTasks 훅 내부 | 재사용 가능, 글로벌 스코프 불필요 |

> 🔹 핵심: **전역은 정말 여러 곳에서 쓰일 때만**.
> 
> 
> 로컬 상태는 **렌더링 범위를 최소화**하여 성능 최적화
> 

---

### 3️⃣ 커스텀 훅 분리 전략

- **useTasks.ts** → 태스크 CRUD + 리스트 상태 + 필터/정렬
- **usePagination.ts** → 페이지네이션 관련 로직
- **useForm.ts** → input validation + 에러 상태 관리

> 💡 이렇게 분리하면 코드 재사용성 ↑, 테스트 용이
> 

---

### 4️⃣ 4주차 마지막 문서 작성 가이드

1. **폴더 구조 설계 이유** → 재사용성 / 유지보수성 / 상태 분리
2. **상태 위치 결정 이유** → 렌더링 최적화 / 전역 vs 로컬
3. **커스텀 훅 분리 이유** → 로직 캡슐화 / 재사용
4. **추가 고민 사항** → 예: API 실패 시 재시도 전략, loading 표시 방법 등

---

💡 한 줄 요약:

> “폴더 구조는 재사용성과 확장성을 고려, 상태는 최소한의 범위로 배치, 커스텀 훅으로 로직 캡슐화, 문서화로 설계 이유를 명확히.”
> 

[https://koreandummyjson.site/docs/todos](https://koreandummyjson.site/docs/todos?utm_source=chatgpt.com)를 사용하자.