# 대시보드 개발 이력

| 날짜 | 내역 |
|------|------|
| 260225 | vite + react 설치, React 초기 셋팅,SCSS 셋팅 |
| 260226 | 타입·store 제작, Zustand 설치 |
| 260228 | 로그인 뼈대 만들기 |
| 260301 | 로그인 버튼 활성화, 유저 mock 데이터 만들기, 버튼 컴포넌트 타입 추가, 로그인 페이지 form 추가  |
| 260303 | 로컬스토리지에 로그인 정보 저장,404페이지 제작 실행 |
| 260305 | CommonList 컴포넌트화(columns/rows/width/emptyMsg props)  |
| 260306 | SubPageLayout + Outlet 적용 (Vue slot 패턴) |
| 260307 | TaskState 컴포넌트화, 상태/우선순위 색상 적용, CommonList 분석 |

---

### 260307 TaskState 컴포넌트화 + 퍼블→프론트 전환 핵심 개념

**작업 내용**
- `TaskState` 컴포넌트를 재사용 가능하게 리팩토링
  - 하드코딩된 4개 버튼 → `states` 배열 props로 동적 생성
  - `onChange` props 추가로 클릭 이벤트 부모에게 전달
  - 클릭한 버튼에만 상태 클래스 추가되도록 조건부 클래스 적용
- 상태별 색상 적용 (request: 파란색, progress: 노란색, review: 보라색, complete: 초록색)
- 우선순위별 색상 적용 (low: 초록색, medium: 노란색, high: 빨간색)
- view/edit 모드 구분, `showOnlySelected`는 CRUD 작업 시 추가 예정

**퍼블에서 프론트로 넘어갈 때 알아야 하는 핵심 개념**

1. **React.ReactNode 타입**
   - JSX에서 렌더링 가능한 모든 값을 받을 수 있는 타입
   - `string`, `number`, `JSX.Element`, `null`, `undefined`, 배열 등 포함
   - 컴포넌트가 어떤 내용이든 유연하게 받아야 할 때 사용
   ```tsx
   interface Props {
     children: React.ReactNode;  // 어떤 JSX든 받을 수 있음
   }
   ```

2. **방어적 코딩 (Array.isArray)**
   - props가 배열인지 확인 후 사용 → 런타임 에러 방지
   ```tsx
   const columns = Array.isArray(props?.columns) ? props.columns : [];
   ```
   - `props.columns`가 `undefined`거나 배열이 아니면 빈 배열 반환
   - `.map()` 호출 시 에러 방지

3. **재사용 가능한 컴포넌트 설계 패턴**
   - **데이터는 props로 받기**: 컴포넌트 내부에 데이터 하드코딩 X
   - **이벤트는 콜백으로 전달**: `onChange`, `onClick` 등을 props로 받아 부모가 처리
   - **optional props 활용**: `onChange?`처럼 선택적으로 만들어 유연성 확보
   ```tsx
   interface TaskStateProps {
     states: StateItem[];        // 데이터
     currentStatus: string;      // 현재 상태
     onChange?: (value: string) => void;  // 콜백 (선택적)
   }
   ```

4. **조건부 클래스 적용 (삼항 연산자)**
   - 클릭/상태에 따라 동적으로 클래스 추가
   ```tsx
   className={`_btn ${currentStatus === state.value ? state.value : ""}`}
   ```
   - `currentStatus`가 해당 버튼의 `value`와 같으면 클래스 추가, 아니면 빈 문자열

5. **컴포넌트 설계 시 고려할 점**
   - 지금 필요한 기능만 구현, 확장 가능하게 구조 잡기
   - API 연동 전에는 UI 구조만 완성, 모드 구분은 데이터 흐름 확정 후 추가
   - 주석으로 나중에 추가할 기능 표시해두기 (`// view에서는 하나만 보여줄거야`)

---

### 260306 SubPageLayout + Outlet 상세

**추가 내용**
- `SubPageLayout`에 React Router `Outlet` 적용 → "여기" 자리에 현재 경로에 맞는 서브페이지 컴포넌트 렌더
- `/task` 중첩 라우트 구성: `SubPageLayout`을 레이아웃으로 두고, `TaskList` / `TaskEdit` / `TaskView`를 자식 라우트로 분리
- `TaskList`에서 `main_wrap`, `Header`, `sub_wrap` 제거 → 레이아웃은 `SubPageLayout`에서만 담당

**사용 이유**
- Vue의 `<router-view>` / slot처럼 **레이아웃은 고정**, **내용만 경로별로 교체**하는 구조를 만들기 위해
- `Outlet`을 사용하면 레이아웃(Header, sub_wrap)을 한 곳에서 관리하고, 서브페이지는 본문만 작성하면 됨
- `/task`, `/task/edit`, `/task/:id` 등 경로가 바뀔 때마다 레이아웃을 다시 쓰지 않고, `Outlet` 위치에 해당 컴포넌트만 교체됨

---

ProtectedRoute 완성 000

Dashboard 뼈대 UI
ㄴ 헤더
ㄴ 메인영역
ㄴ 로그인 유저 이름 표시
ㄴ 헤더/메인 컴포넌트 분리
ㄴ 공통리스트제작: 어떻게 제작했는지 블로그에 작성하기

API 모듈 작성

Task 타입 설계

useTasks 1차 구현 (fetch + loading)

TaskList 연결

CRUD 붙이기

필터/정렬

페이지네이션

문서화


