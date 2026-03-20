# 페이지네이션 구현 명세서

## 개요
TaskList 페이지에 페이지네이션 기능을 추가하여 최대 25개의 항목을 페이지별로 표시합니다.

---

## 1단계: Pagenation 컴포넌트 개선

### 파일 위치
`src/pages/common/Pagenation.tsx`

### 변경 내용

#### Props 인터페이스 정의
```typescript
interface PagenationProps {
    currentPage: number;      // 현재 페이지 번호
    totalPages: number;       // 전체 페이지 수
    onPageChange: (page: number) => void;  // 페이지 변경 콜백
    maxVisiblePages?: number; // 표시할 최대 페이지 버튼 수 (기본값: 5)
}
```

#### 주요 로직

| 기능 | 설명 |
|------|------|
| 자동 숨김 | `totalPages <= 1`일 때 컴포넌트 렌더링하지 않음 |
| 동적 페이지 버튼 | 현재 페이지 기준으로 좌우 균형있게 표시 |
| 이전/다음 버튼 | 첫 페이지/마지막 페이지에서 비활성화 |

#### getVisiblePages 함수
```typescript
// 현재 페이지를 중심으로 표시할 페이지 번호 배열 계산
const getVisiblePages = (): number[] => {
    const pages: number[] = [];
    const half = Math.floor(maxVisiblePages / 2);
    
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    
    return pages;
};
```

---

## 2단계: TaskList 페이지네이션 로직 구현

### 파일 위치
`src/pages/task/TaskList.tsx`

### 상수 정의
```typescript
const ITEMS_PER_PAGE = 25;  // 페이지당 항목 수
```

### URL 쿼리 파라미터 관리

| 파라미터 | 설명 | 예시 |
|----------|------|------|
| `tab` | 탭 상태 (all/mine) | `?tab=mine` |
| `page` | 페이지 번호 | `?page=2` |

```typescript
// URL에서 현재 페이지 추출
const pageParam = searchParams.get("page");
const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);
```

### 페이지네이션 계산

```typescript
// 전체 페이지 수 계산
const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);

// 유효한 페이지 범위 보정
const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));

// 현재 페이지에 표시할 데이터 슬라이싱
const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;
const paginatedTasks = filteredTasks.slice(startIndex, endIndex);
```

### 페이지 변경 핸들러

```typescript
const handlePageChange = (page: number) => {
    const params = new URLSearchParams(location.search);
    if (page === 1) {
        params.delete("page");  // 1페이지는 쿼리 파라미터 생략
    } else {
        params.set("page", String(page));
    }
    const queryString = params.toString();
    navigate(`/task${queryString ? `?${queryString}` : ""}`);
};
```

### 탭 변경 시 페이지 초기화

```typescript
const handleTabChange = (newTab: "all" | "mine") => {
    if (newTab === "all") {
        navigate("/task");
    } else {
        navigate("/task?tab=mine");
    }
    // 탭 변경 시 페이지가 자동으로 1로 리셋됨
};
```

### 번호 표시 로직
```typescript
// 페이지네이션을 고려한 올바른 번호 표시
const rows = paginatedTasks.map((task, i) => taskToRow(task, startIndex + i));
```

---

## 3단계: 컴포넌트 연결

### Pagenation 컴포넌트 사용

```tsx
<Pagenation
    currentPage={validCurrentPage}
    totalPages={totalPages}
    onPageChange={handlePageChange}
/>
```

---

## URL 예시

| URL | 설명 |
|-----|------|
| `/task` | 전체 탭, 1페이지 |
| `/task?page=2` | 전체 탭, 2페이지 |
| `/task?tab=mine` | 내 업무 탭, 1페이지 |
| `/task?tab=mine&page=3` | 내 업무 탭, 3페이지 |

---

## 동작 흐름

```
1. 사용자가 /task 접속
   └─> URL에서 tab, page 파라미터 추출
   
2. 데이터 필터링 (탭 기준)
   └─> filteredTasks 생성
   
3. 페이지네이션 계산
   └─> totalPages, startIndex, endIndex 계산
   
4. 데이터 슬라이싱
   └─> paginatedTasks (25개 이하)
   
5. 테이블 렌더링 + Pagenation 컴포넌트 렌더링

6. 페이지 버튼 클릭
   └─> handlePageChange 호출
   └─> URL 업데이트 (navigate)
   └─> 컴포넌트 리렌더링
```

---

## 스타일 클래스 (참고)

| 클래스 | 설명 |
|--------|------|
| `.common_pagenation` | 페이지네이션 컨테이너 |
| `._list` | 페이지 버튼 리스트 |
| `._item` | 개별 페이지 버튼 |
| `._item.on` | 현재 활성 페이지 |
| `._item.disabled` | 비활성 버튼 (이전/다음) |

---

## 작성일
2026-03-20
