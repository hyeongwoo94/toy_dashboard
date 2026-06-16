export type ExplainTabId = "structure" | "login" | "task" | "notice";

export interface ExplainItem {
    title: string;
    description: string;
    /** 왜 이렇게 구성했는지 (description과 keywords 사이에 표시, 파일구조 탭 등) */
    rationale?: string;
    keywords?: string[];
}

export interface ExplainTab {
    id: ExplainTabId;
    label: string;
    summary: string;
    items: ExplainItem[];
}

export const explainTabs: ExplainTab[] = [
    {
        id: "structure",
        label: "파일구조",
        summary:
            "Cursor로 제작한 이 사이트의 폴더·라우팅 구조입니다. ERP 퍼블리싱 경험 + 스파트타클럽 프론트엔드 과정을 바탕으로, 화면·기능·공통 UI를 나누어 유지보수하기 쉽게 구성했습니다.",
        items: [
            {
                title: "빌드·기술 스택",
                description:
                    "Vite + React + TypeScript로 SPA를 만들고, SCSS로 스타일을 관리합니다. 페이지 이동은 React Router, 전역 상태는 Zustand를 사용합니다. 달력·날짜는 react-calendar, react-datepicker를 씁니다. 업무 데이터는 DummyJSON(https://dummyjson.com/todos) API, 로그인·공지는 목데이터와 localStorage로 처리합니다.",
                rationale:
                    "1. Vite·React·TypeScript로 프론트 개발·빌드 환경을 구성했습니다.\n" +
                    "2. Zustand, React Router, SCSS 등으로 화면·상태·스타일을 나눠 관리합니다.\n" +
                    "3. 업무는 DummyJSON API, 그 외(로그인·공지·세션)는 목데이터·localStorage로 백엔드 없이 동작하게 했습니다.",
                keywords: [
                    "Vite",
                    "React",
                    "TypeScript",
                    "SCSS",
                    "Zustand",
                    "React Router",
                    "DummyJSON",
                    "localStorage",
                ],
            },
            {
                title: "pages/",
                description:
                    "화면별 컴포넌트를 모아 둔 폴더입니다. login, task, notice, main, explain처럼 메뉴·기능 단위로 폴더를 나누고, 각 폴더 안에는 해당 페이지 전용 component 폴더를 둡니다.",
                rationale:
                    "1. 카테고리(기능)별로 폴더를 나눠, 새로 합류한 작업자가 수정할 파일 위치를 빠르게 찾을 수 있게 했습니다.\n" +
                    "2. 한 메뉴 안에서도 목록·상세·수정 등 파일이 늘어날 수 있고, 그 안에서만 쓰는 UI를 재사용할 수 있어 pages/login/component, pages/task/components처럼 각 폴더마다 components를 두었습니다.\n" +
                    "3. 여러 메뉴에서 같이 쓰는 UI는 src/components에, 특정 메뉴에서만 쓰는 UI는 해당 pages 폴더의 components에 둡니다.",
                keywords: ["React", "페이지 컴포넌트", "폴더 구조"],
            },
            {
                title: "components/",
                description:
                    "여러 페이지에서 재사용하는 공통 UI입니다. CommonBtn, CommonInput, CommonModal, CommonToast 등이 있습니다.",
                rationale:
                    "1. 이 사이트 전체에서 공통으로 사용되는 컴포넌트들입니다.",
                keywords: ["재사용 컴포넌트"],
            },
            {
                title: "features/",
                description:
                    "데이터·상태·타입·API를 관리하는 폴더입니다. auth(인증), user(사용자), task(업무), notice(공지), Common(공통 UI 상태)로 나뉘며, 각 폴더마다 타입 정의, Zustand 스토어, 목데이터·API 파일을 둡니다.",
                rationale:
                    "1. features는 로그인 상태·업무 데이터·공지 CRUD처럼 여러 화면에서 공통으로 쓰는 로직과 데이터를 담습니다.\n" +
                    "2. auth, user, task, notice처럼 메뉴·도메인 단위로 폴더를 나눠, pages 폴더 구조와 맞춰 두었습니다. 업무 관련 수정은 features/task, 공지 관련 수정은 features/notice에서 찾을 수 있습니다.\n" +
                    "3. 폴더 안 파일 역할도 비슷하게 맞췄습니다. 예: task.ts·notice.ts는 타입, *Store.ts는 Zustand 상태, mock*.ts는 목데이터, task/api.ts는 API 호출. 한 도메인에 필요한 것만 모아 두었습니다.\n" +
                    "4. modalStore, toastStore처럼 특정 메뉴에 속하지 않고 여러 페이지에서 쓰는 UI 상태는 features/Common에 뒀습니다.",
                keywords: ["Zustand", "타입 정의", "도메인 분리", "API"],
            },
            {
                title: "라우팅 (React Router)",
                description:
                    "main.tsx의 BrowserRouter와 App.tsx의 Routes로 페이지 이동을 관리합니다. 단일 경로(/, /login), 중첩 경로(/task, /notice, /explain), 동적 경로(view/:id, edit/:id), 404(*)를 함께 사용합니다.",
                rationale:
                    "1. main.tsx에서 BrowserRouter로 앱 전체를 감싸고, 렌더 전 restoreFromStorage()로 로그인 상태를 복원합니다. 라우트가 isLoggedIn을 바로 판단할 수 있게 하기 위함입니다.\n" +
                    "2. ProtectedRoute로 로그인이 필요한 페이지를 감쌌습니다. 비로그인 시 /login으로 Navigate(replace)합니다. /, /task, /notice, /explain에 적용했습니다.\n" +
                    "3. /login은 반대로 처리했습니다. 이미 로그인된 사용자는 /로 보내고, 아니면 LoginPage를 보여줍니다. 로그인 화면에 다시 들어가지 않게 하기 위함입니다.\n" +
                    "4. /task, /notice는 index(목록), view/:id(상세), edit·edit/:id(작성/수정)로 나눴습니다. URL만으로 화면 단계를 구분하고, 뒤로가기·링크 공유가 가능하게 했습니다.\n" +
                    "5. CommonModal·CommonToast는 Route 밖에 뒀습니다. 어느 페이지에서든 useModalStore, useToastStore로 열 수 있는 전역 UI이기 때문에 URL 경로와 무관하게 유지합니다.\n" +
                    '6. path="*"로 NotFound를 연결해, 등록되지 않은 주소 접근 시 404 페이지를 보여줍니다.',
                keywords: [
                    "BrowserRouter",
                    "Routes",
                    "ProtectedRoute",
                    "Navigate",
                    "Outlet",
                    "중첩 라우트",
                    "동적 라우트",
                ],
            },
        ],
    },
    {
        id: "login",
        label: "로그인",
        summary: "목데이터 기반 로그인과 인증 상태 유지 방식을 사용했습니다.",
        items: [
            {
                title: "폼 상태 관리",
                description:
                    "LoginPage에서 useState로 아이디·비밀번호 입력값과 에러 상태를 관리하고, submit 시 유효성 검사 후 로그인을 시도합니다.",
                keywords: ["useState", "controlled input"],
            },
            {
                title: "인증 스토어 (Zustand)",
                description:
                    "useAuthStore로 로그인 여부, 사용자 이름, 권한(role)을 전역 관리합니다. login/logout 시 localStorage에 저장해 새로고침 후에도 세션을 복원합니다.",
                keywords: ["Zustand", "localStorage"],
            },
            {
                title: "목데이터 검증",
                description:
                    "mockUsers 배열에서 loginId·password가 일치하는 사용자를 찾아 로그인합니다. checkLogin 유틸로 검증 로직을 분리할 수도 있습니다.",
                keywords: ["mockUsers", "목데이터"],
            },
            {
                title: "라우트 보호",
                description:
                    "ProtectedRoute 컴포넌트가 isLoggedIn을 확인하고, 비로그인 사용자는 /login으로 리다이렉트합니다.",
                keywords: ["ProtectedRoute", "Navigate"],
            },
            {
                title: "테스트 계정 안내 팝업",
                description:
                    "LoginInfoModal로 테스트 계정을 팝업 형태로 보여주고, 항목 클릭 시 해당 계정으로 바로 로그인할 수 있습니다.",
                keywords: ["LoginInfoModal", "팝업"],
            },
        ],
    },
    {
        id: "task",
        label: "업무",
        summary:
            "업무 목록에서 「전체」·「내 업무」 탭과 검색으로 업무를 찾고, 행을 클릭하면 상세 페이지로 이동합니다. 「업무요청」에서 새 업무를 등록할 때 담당자는 등록된 사용자 이름(관리자·팀장·팀원)만 입력할 수 있으며, DB(mockUsers)에 없는 이름이면 저장되지 않습니다. 관리자와 팀장은 모든 업무에 접근할 수 있고, 팀원은 자신의 업무 내용만 수정할 수 있습니다. 상세 화면에서는 담당자 또는 관리자가 업무 상태(요청·진행·검토·완료)를 변경합니다.",
        items: [
            {
                title: "커스텀 훅 useTasks",
                description:
                    "useEffect로 마운트 시 업무 목록을 불러오고, isLoading·tasks·refetch를 반환합니다. API 호출 실패 시 빈 배열로 처리합니다.",
                keywords: ["useEffect", "useCallback", "커스텀 훅"],
            },
            {
                title: "URL 쿼리 연동",
                description:
                    "useSearchParams·useLocation으로 탭(all/mine), 검색어(q), 페이지(page)를 URL에 반영해 새로고침·공유 시 상태가 유지됩니다.",
                keywords: ["useSearchParams", "URL 상태"],
            },
            {
                title: "탭·검색 UI",
                description:
                    "공통 tab_btn_layout과 CommonBtn으로 전체/내 업무 탭을 전환하고, 검색·초기화 버튼으로 목록을 필터링합니다.",
                keywords: ["tab_btn_layout", "필터링"],
            },
            {
                title: "TaskTable 재사용",
                description:
                    "columns·rows props로 테이블을 그리며, 행 클릭 시 상세 페이지로 이동합니다. 로딩 중에는 Loading 컴포넌트를 표시합니다.",
                keywords: ["TaskTable", "Pagenation"],
            },
            {
                title: "삭제 확인 모달",
                description:
                    "useModalStore().open()으로 전역 CommonModal을 띄워 삭제 전 확인을 받습니다.",
                keywords: ["useModalStore", "CommonModal"],
            },
        ],
    },
    {
        id: "notice",
        label: "공지사항",
        summary:
            "공지사항 목록에서 제목·작성자·날짜·반복 여부를 확인하고, 행 클릭 시 상세 내용을 볼 수 있습니다. 공지 등록은 관리자만 가능하며, 등록 시 특정 날짜에 한 번 표시하거나 「매주 O요일 반복」을 선택할 수 있습니다. 등록된 공지는 메인 페이지 달력에 표시되고, 날짜를 선택하면 하단 「Bigbro day」 목록에서 해당 일정을 확인할 수 있습니다.",
        items: [
            {
                title: "공지 스토어 (Zustand)",
                description:
                    "useNoticeStore로 공지 목록 상태를 관리합니다. mockNotice 기반 데이터로 CRUD를 처리합니다.",
                keywords: ["useNoticeStore", "Zustand"],
            },
            {
                title: "목록·검색·페이지네이션",
                description:
                    "NoticeList에서 검색어(q)와 페이지(page)를 URL 쿼리로 관리하고, Pagenation 컴포넌트로 페이지를 나눕니다.",
                keywords: ["useLocation", "Pagenation"],
            },
            {
                title: "TaskTable 공유",
                description:
                    "업무 목록과 동일한 TaskTable 컴포넌트를 재사용해 공지 목록 테이블을 구성했습니다.",
                keywords: ["컴포넌트 재사용"],
            },
            {
                title: "권한별 UI",
                description:
                    "useAuthStore의 role(admin 등)에 따라 작성·수정·삭제 버튼 노출 여부를 조건부 렌더링합니다.",
                keywords: ["role", "조건부 렌더링"],
            },
            {
                title: "상세·수정 라우트",
                description:
                    "/notice/view/:id, /notice/edit 경로로 상세 보기와 작성/수정 화면을 분리했습니다.",
                keywords: ["useNavigate", "동적 라우트"],
            },
        ],
    },
];

export const defaultExplainTabId: ExplainTabId = "structure";
