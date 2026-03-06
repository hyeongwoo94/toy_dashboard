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


