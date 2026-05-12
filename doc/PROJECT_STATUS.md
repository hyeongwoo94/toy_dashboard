# 프로젝트 현황 문서

> 작성일: 2026-05-12

---

## 1. 프로젝트 개요

### 프로젝트명

**업무용 태스크 관리 대시보드 (Toy Dashboard)**

### 기술 스택

| 분류       | 기술                                |
| ---------- | ----------------------------------- |
| 프레임워크 | React 19 + TypeScript               |
| 빌드 도구  | Vite 7                              |
| 상태 관리  | Zustand 5                           |
| 라우팅     | React Router DOM 7                  |
| 스타일링   | SCSS                                |
| API        | DummyJSON API + localStorage (임시) |

### 프로젝트 목적

- 회사 업무를 관리하는 태스크 대시보드 구현
- Task(업무)의 생성, 조회, 수정, 삭제(CRUD) 및 상태 관리
- 사용자 권한별 기능 제어 (관리자, 팀장, 팀원)

### Task 데이터 구조

```typescript
interface Task {
    id: string; // 태스크 아이디
    title: string; // 태스크 제목
    createdDay: string; // 작성일
    doneDay?: string; // 마감일
    description?: string; // 내용
    importStatus?: "low" | "medium" | "high"; // 중요도
    status?: "request" | "in-progress" | "review" | "done"; // 상태
    authorId: string; // 작성자
    assigneeId: string; // 담당자
}
```

---

## 2. 완료된 기능 (진행률: 약 75%)

### 2.1 인증 시스템 ✅

- [x] Mock 로그인 구현
- [x] 세션 유지 (localStorage)
- [x] Protected Route 설정
- [x] 역할 기반 권한 관리 (admin, manager, member)

**테스트 계정:**
| 역할 | 아이디 | 비밀번호 |
|------|--------|----------|
| 관리자 | admin | admin |
| 팀장 | manager | manager123 |
| 팀원 | user | user123 |

### 2.2 메인 대시보드 ✅

- [x] 전체 업무 목록 위젯
- [x] 내 업무 목록 위젯
- [x] 캘린더 (react-calendar)
- [x] 공지사항 위젯
- [x] 오늘 생일자 표시

### 2.3 Task CRUD ✅

- [x] 목록 조회 (페이지네이션 포함)
- [x] 상세 조회
- [x] 신규 등록
- [x] 수정
- [x] 삭제 (모달 확인)

### 2.4 상태 관리 ✅

- [x] Zustand 기반 전역 상태 관리
- [x] 인증 상태 (authStore)
- [x] 모달 상태 (modalStore)
- [x] Task 상태 (taskStore)

### 2.5 UI/UX ✅

- [x] 반응형 레이아웃
- [x] 공통 컴포넌트 구현
    - CommonBtn, CommonInput, CommonTextarea
    - CommonList, CommonModal, CommonDatepicker
- [x] 로딩 컴포넌트
- [x] 404 에러 페이지

### 2.6 API 연동 ✅

- [x] DummyJSON API 연동
- [x] localStorage를 활용한 로컬 데이터 영구 저장
- [x] API 모듈 분리 (`features/task/api.ts`)

---

## 3. 진행 중 / 미완료 기능 (약 25%)

### 3.1 필터/정렬 기능 🔄

- [x] 전체/내 업무 탭 필터링
- [ ] 상태별 필터링 (요청/진행/검토/완료)
- [ ] 중요도별 필터링
- [ ] 날짜별 정렬
- [x] 검색 기능

### 3.2 폼 Validation 🔄

- [x] 기본 필수값 검증
- [x] 상세 에러 메시지
- [ ] 실시간 유효성 검사
- [ ] 폼 상태 관리 훅 (useForm)

### 3.3 기타 미완료 ❌

- [ ] 공지사항 CRUD (현재 Mock 데이터만 사용)
- [ ] 사용자 관리 기능
- [ ] 테스트 코드 작성
- [ ] 설계 문서 작성 ("왜 이렇게 설계했는지")
- [ ] 실제 백엔드 API 연동

---

## 4. 폴더 구조

```
src/
├── assets/scss/          # 스타일시트
│   ├── _common.scss
│   ├── _login.scss
│   ├── _main.scss
│   ├── _mixin.scss
│   └── _task.scss
├── components/           # 재사용 가능한 공통 컴포넌트
│   ├── CommonBtn.tsx
│   ├── CommonDatepicker.tsx
│   ├── CommonInput.tsx
│   ├── CommonList.tsx
│   ├── CommonModal.tsx
│   └── CommonTextarea.tsx
├── features/             # 도메인별 로직 및 상태
│   ├── auth/            # 인증 관련
│   ├── Common/          # 공통 스토어 (모달)
│   ├── notice/          # 공지사항
│   ├── task/            # 태스크 (핵심 도메인)
│   └── user/            # 사용자
├── pages/                # 페이지 컴포넌트
│   ├── common/          # 공통 레이아웃 (Header, SubPageLayout, Pagination)
│   ├── error/           # 에러 페이지
│   ├── login/           # 로그인 페이지
│   ├── main/            # 메인 대시보드
│   ├── notice/          # 공지사항 페이지
│   └── task/            # 태스크 관련 페이지
├── App.tsx               # 라우팅 설정
├── main.tsx              # 엔트리 포인트
└── theme.css             # 테마 CSS 변수
```

---

## 5. 앞으로 해야 할 작업 (우선순위 순)

### 🔴 높은 우선순위

1. **필터/정렬 기능 확장**
    - 상태별 필터 추가 (요청/진행/검토/완료)
    - 중요도별 필터
    - 제목/내용 검색 기능

2. **폼 Validation 강화**
    - 제목 필수값 검증
    - 담당자 필수값 검증
    - 날짜 유효성 검사

### 🟡 중간 우선순위

3. **커스텀 훅 분리**
    - `useForm.ts` - 폼 상태 관리 훅
    - `usePagination.ts` - 페이지네이션 훅
    - 현재 `useTasks.ts`는 구현됨

4. **공지사항 기능 완성**
    - 공지사항 CRUD 구현
    - 실제 API 연동 또는 localStorage 저장

5. **UX 개선**
    - 로딩 스켈레톤
    - 에러 바운더리
    - 토스트 알림

### 🟢 낮은 우선순위

6. **설계 문서 작성**
    - 폴더 구조 설계 이유
    - 상태 위치 결정 이유
    - 커스텀 훅 분리 이유

7. **테스트 코드**
    - 단위 테스트 (Jest/Vitest)
    - 컴포넌트 테스트 (React Testing Library)

8. **실제 API 연동**
    - 백엔드 서버 연동
    - API 에러 핸들링 강화

---

## 6. 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 린트 검사
npm run lint
```

---

## 7. 참고 자료

- API: https://dummyjson.com/docs/todos
- README에 기재된 한국어 더미 API: https://koreandummyjson.site/docs/todos

---

_이 문서는 프로젝트 복귀 시 빠른 파악을 위해 작성되었습니다._
