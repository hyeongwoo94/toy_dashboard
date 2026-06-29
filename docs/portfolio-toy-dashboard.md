# 포트폴리오용 — toy_dashboard 프로젝트 정리

> 이 문서는 개인 포트폴리오 사이트의 `AIProject`, `WORKFLOW_EXAMPLE`, 궤도(orbit) 데이터에  
> **복사·붙여넣기** 할 수 있도록 정리한 자료입니다.

---

## 1. 포트폴리오 한 줄 소개

ERP 퍼블리싱 경험을 바탕으로 React·TypeScript로 설계한 **업무 태스크 관리 대시보드 SPA**.  
폴더·상태·라우팅은 직접 설계하고, **Cursor**로 구현을 가속했으며 DummyJSON 한계를 localStorage로 보완한 **퍼블→프론트 전환** 학습 프로젝트.

- **배포**: https://toy-dashboard-big-bro-woo.vercel.app/
- **GitHub**: (본인 저장소 URL)
- **테스트 계정**: `admin` / `admin` (로그인 화면 팝업에서 클릭 로그인 가능)

---

## 2. 궤도 / 리스트용 데이터 (portfolioData)

```ts
{
    id: "toy-dashboard",
    title: "업무 태스크 대시보드",
    url: "https://toy-dashboard-big-bro-woo.vercel.app/login",
    thumbnail: "/images/portfolio/toy-dashboard.png", // 캡처 이미지 경로 (본인 추가)
    orbit: "inner", // inner | outer — 궤도 배치용
}
```

**캡처 추천 화면**
1. 메인 대시보드 (`/` — 그리드 4블록)
2. 업무 목록 (`/task`)
3. 사이트 설명 (`/explain` — 파일구조 탭)
4. 모바일 햄버거 메뉴 (768px 이하)

---

## 3. AIProject 데이터 (복사용)

아래 객체를 `AI_EXPERIENCE_DATA` 배열에 추가하면 됩니다.

```ts
{
    id: "toy-dashboard",
    title: "업무 태스크 관리 대시보드",
    description:
        "ERP 퍼블리싱 경험을 바탕으로, 퍼블리셔 → 프론트엔드 전환 학습 목적으로 제작한 React SPA입니다. " +
        "로그인·메인 대시보드·업무 CRUD·공지사항·사이트 설명 페이지를 포함하며, " +
        "pages / features / components 폴더 구조와 Zustand·React Router·커스텀 훅(useTasks)을 직접 설계했습니다. " +
        "Cursor를 활용해 구현을 가속했고, 설계 의도는 앱 내 「사이트 설명」 페이지와 docs에 문서화했습니다.",
    techStack: [
        "React 19",
        "TypeScript",
        "Vite",
        "React Router",
        "Zustand",
        "SCSS",
        "DummyJSON",
        "react-calendar",
        "react-datepicker",
    ],
    aiTools: ["Cursor"],
    workflow: [
        {
            id: "cmd",
            role: "command",
            label: "명령",
            description: "요구사항·의도 전달",
        },
        {
            id: "dir",
            role: "director",
            label: "총괄",
            description: "구조·범위 판단",
        },
        {
            id: "plan",
            role: "planning",
            label: "기획",
            description: "폴더·라우트·상태 설계",
        },
        {
            id: "code",
            role: "code",
            label: "구현",
            description: "컴포넌트·스타일·연결",
        },
        {
            id: "review",
            role: "review",
            label: "검토",
            description: "실행·UI·문서 정리",
        },
    ],
    aiBenefits: [
        {
            title: "설계는 본인, 구현은 AI 가속",
            description:
                "pages/features/components 분리, main_grid vs sub_layout, ProtectedRoute 등 " +
                "핵심 구조는 직접 결정하고, 모달·설명 페이지·모바일 메뉴 등은 Cursor로 빠르게 구현했습니다.",
        },
        {
            title: "퍼블 경험이 AI 산출물 검토에 유리",
            description:
                "SCSS·반응형·레이아웃 기준이 있어 AI가 만든 UI도 " +
                "그리드·브레이크포인트·간격을 본인 기준에 맞게 수정하기 쉬웠습니다.",
        },
        {
            title: "앱 내 + docs 이중 문서화",
            description:
                "explainTabs.ts에 설계 rationale을 남기고, docs/와 README에 학습·API·Cursor 협업을 정리해 " +
                "면접에서 코드 없이도 의도를 설명할 수 있습니다.",
        },
        {
            title: "막힐 때 힌트 → 필요 시 구현",
            description:
                "Zustand, Outlet, SPA 배포(vercel.json) 등 막히는 지점은 힌트로 방향을 잡고, " +
                "「제작해줘」로 명시할 때만 코드를 받아 학습과 속도를 동시에 확보했습니다.",
        },
    ],
    automations: [
        "요구사항 정리 후 구현 요청",
        "기존 패턴(tab_btn_layout, SubPageLayout) 재사용 구현",
        "explainTabs / README 문서 초안",
        "배포 이슈(SPA 404) 원인 분석 및 vercel.json 제안",
    ],
},
```

---

## 4. 워크플로우 예시 대화 (WORKFLOW_EXAMPLE)

포트폴리오 `WORKFLOW_EXAMPLE`에 넣거나, 이 프로젝트 전용 예시로 사용할 수 있습니다.

```ts
export const TOY_DASHBOARD_WORKFLOW_EXAMPLE: WorkflowExample[] = [
    {
        role: "command",
        label: "사용자 명령",
        content:
            "로그인 페이지에 테스트 계정 안내 팝업을 만들고 싶어. " +
            "항상 열려 있고, 닫기 가능, 계정 클릭 시 바로 로그인되게.",
    },
    {
        role: "director",
        label: "방향 정리",
        content:
            "로그인 전용 컴포넌트로 pages/login/component에 두고, " +
            "전역 모달이 아닌 로컬 state로 관리합니다. " +
            "스타일은 _login.scss, mockUsers 데이터를 재사용합니다.",
    },
    {
        role: "planning",
        label: "설계",
        content:
            "• LoginInfoModal — isOpen, onClose, onSelectAccount props\n" +
            "• LoginPage — useState(true) 초기 열림\n" +
            "• 팝업 형태(전체 오버레이 X, 우하단 카드)\n" +
            "• 담당자 검증은 mockUsers.name 기준",
    },
    {
        role: "code",
        label: "구현",
        content:
            "구현 완료.\n" +
            "• LoginInfoModal.tsx, _login.scss\n" +
            "• handleAccountSelect → useAuthStore.login\n" +
            "• 이후 피드백: 오버레이 제거 → 팝업 형태로 수정\n" +
            "• 테스트 계정 안내 버튼 추가",
    },
    {
        role: "review",
        label: "검토",
        content:
            "• admin / manager / user 계정 클릭 로그인 확인\n" +
            "• 모바일 반응형(하단 full width) 확인\n" +
            "• explainTabs 로그인 탭 description과 실제 동작 일치 여부 점검",
    },
];
```

---

## 5. 프로젝트 기능 요약 (포트폴리오 설명용)

### 로그인
- mockUsers 3역할 (admin / manager / user)
- Zustand `useAuthStore` + localStorage 세션
- `ProtectedRoute`로 비로그인 차단
- 테스트 계정 팝업 (`LoginInfoModal`)

### 메인 (`/`)
- CSS Grid 대시보드 (`main_grid`)
- 전체 업무 / 달력(공지·생일) / 내 업무 / 공지 미리보기

### 업무 (`/task`)
- DummyJSON `/todos` + localStorage merge
- 커스텀 훅 `useTasks`
- 탭(전체·내 업무) · 검색 · 페이지네이션 — URL 쿼리 연동
- 목록 · 상세 · 등록/수정 CRUD
- 담당자 mockUsers 검증, 권한별 수정/삭제/상태 변경

### 공지 (`/notice`)
- 관리자만 등록
- 특정 날짜 / 매주 요일 반복
- 메인 달력 `Bigbro day` 연동

### 사이트 설명 (`/explain`)
- 파일구조·로그인·업무·공지 탭
- 파일구조 탭에 **설계 rationale** (왜 pages/features로 나눴는지)
- Cursor + ERP 퍼블 경험 소개 summary

### 공통 UX
- `theme.css` 디자인 토큰
- 768px 이하 햄버거 + 좌측 슬라이드 메뉴
- 활성 메뉴 accent + bold
- 전역 CommonModal / CommonToast

---

## 6. 설계 포인트 (면접·TechNote용)

| 주제 | 한 줄 설명 |
|------|------------|
| **pages / features / components** | 화면 · 도메인 로직 · 공통 UI 분리. 메뉴 단위로 찾기 쉽게 |
| **main_grid vs sub_layout** | 메인은 4위젯 그리드+반응형 재배치, 서브는 단일 본문 흐름 |
| **SubPageLayout + Outlet** | task/notice/explain 헤더 공유 |
| **상태 배치** | 전역(Zustand) vs 훅(useTasks) vs URL 쿼리 vs 폼 로컬 state |
| **DummyJSON + localStorage** | API 비영구 한계 보완, Task 도메인 필드 확장 |
| **vercel.json rewrite** | SPA 새로고침 404 해결 |

---

## 7. 본인이 결정한 것 vs Cursor가 도운 것

### 본인이 결정·작성
- 폴더 구조, 라우팅, 레이아웃 전략
- 업무·공지·로그인 비즈니스 규칙
- `explainTabs.ts` rationale (pages, features, 라우팅, 기술 스택)
- TaskState, TaskInput, CommonList 등 핵심 컴포넌트 (학습 과정에서 직접 작성)
- UI 피드백 (팝업→카드형, 목록에서 내용 컬럼 제거, 모바일 메뉴 스펙)

### Cursor가 가속·지원
- LoginInfoModal, ExplainPage 뼈대, 모바일 Header
- explainTabs / README 초안
- SPA 배포 404 원인 설명 및 vercel.json
- Zustand, Outlet, pagination 등 개념 힌트

---

## 8. TechNote / AI 경험 섹션용 짧은 문단

```text
업무 태스크 대시보드는 ERP 퍼블리싱 경험을 살려 React로 전환한 학습 프로젝트입니다.
폴더 구조와 라우팅은 스스로 설계했고, Cursor는 모달·설명 페이지·모바일 메뉴 구현과
문서 초안 작성에 활용했습니다. DummyJSON API와 localStorage를 조합해 CRUD 흐름을
완성했으며, 설계 의도는 배포 사이트의 「사이트 설명」 메뉴에서 확인할 수 있습니다.
```

---

## 9. 주의할 점 (면접 시 정직하게)

문서와 코드가 다른 부분 — 알고 있으면 신뢰도가 올라갑니다.

| 문서/설명 | 실제 코드 |
|-----------|-----------|
| 팀장은 모든 업무 접근 | `TaskView`는 `admin` 또는 작성자/담당자 **이름** 기준. `manager` role 분기 없음 |
| 다크 모드 | `theme.css`에 변수만 있고 UI 토글 없음 |
| 공지 CRUD | 등록·조회 중심, 수정/삭제 스토어 액션 제한적 |

→ "의도는 ○○이고, 현재는 △△까지 구현했다"고 말하면 됩니다.

---

## 10. 관련 파일 빠른 링크 (본인 repo 기준)

| 용도 | 경로 |
|------|------|
| 라우팅 | `src/App.tsx` |
| 설계 문서(앱) | `src/pages/explain/data/explainTabs.ts` |
| 업무 API | `src/features/task/api.ts` |
| 커스텀 훅 | `src/pages/task/features/useTasks.ts` |
| 메인 그리드 | `src/assets/scss/_main.scss` |
| 서브 레이아웃 | `src/assets/scss/_common.scss` |
| 배포 설정 | `vercel.json` |
| 학습 이력 | `docs/dash-board-history.md` |

---

## 11. AI_EXPERIENCE_DATA 배열 예시 (전체 삽입 위치)

```ts
export const AI_EXPERIENCE_DATA: AIProject[] = [
    {
        id: "portfolio",
        title: "인터랙티브 포트폴리오",
        // ... 기존 포트폴리오 사이트
    },
    {
        // ↑ 섹션 3의 toy-dashboard 객체 붙여넣기
        id: "toy-dashboard",
        title: "업무 태스크 관리 대시보드",
        // ...
    },
    {
        id: "ERP",
        title: "ERP",
        description: "추후 작성 예정입니다.",
        // ...
    },
];
```

---

*작성 기준: toy_dashboard 저장소 전체 구조·README·explainTabs·대화 기록 반영*
