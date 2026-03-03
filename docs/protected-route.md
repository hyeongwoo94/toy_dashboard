# ProtectedRoute (라우트 보호) 정리

로그인한 사용자만 접근할 수 있는 경로를 보호하기 위한 패턴이다.

---

## 1. 왜 필요한가

- **비로그인 사용자**가 URL을 직접 입력해서 메인(대시보드) 등에 들어오는 것을 막기 위해.
- "이 경로는 로그인한 사람만 보여준다"는 규칙을 한 곳에서 처리하기 위해.

---

## 2. 핵심 개념

| 개념 | 설명 |
|------|------|
| **보호할 경로** | 로그인해야만 볼 수 있는 경로 (예: `/`, `/dashboard`) |
| **인증 상태** | 스토어 등에서 가져오는 `isLoggedIn` 같은 값 |
| **리다이렉트** | 조건에 맞지 않으면 로그인 페이지(`/login`)로 보냄 |
| **children** | 보호된 경로에서 실제로 보여줄 컴포넌트(페이지) |

ProtectedRoute는 **"인증됐으면 children을 보여주고, 아니면 로그인 페이지로 보낸다"**는 래퍼 컴포넌트다.

---

## 3. 작성 순서

### 3-1. 인증 상태가 어디 있는지 정하기

- 예: Zustand `useAuthStore`의 `isLoggedIn`
- 이 값을 ProtectedRoute 안에서 구독한다.

### 3-2. 리다이렉트용 컴포넌트 준비

- React Router의 **`Navigate`**를 사용한다.
- `to`: 이동할 경로 (예: `/login`)
- `replace`: `true`로 두면 히스토리에 현재 주소를 남기지 않고 교체한다. (뒤로가기 시 로그인 페이지로 다시 안 돌아가게 할 때 유용)

### 3-3. ProtectedRoute 컴포넌트 작성

1. **props**: 보호된 경로에서 렌더할 **자식(페이지)** 을 받는다. → `children`
2. **로직**:
   - 인증 스토어에서 `isLoggedIn`을 읽는다.
   - `isLoggedIn === false` → `<Navigate to="/login" replace />` 반환 (로그인 페이지로 보냄)
   - `isLoggedIn === true` → `children`을 그대로 반환 (보호된 페이지 표시)
3. **타입**: `children`은 `React.ReactNode`로 두면 된다.

### 3-4. 라우트에 적용

- 보호가 필요한 `Route`의 `element`를 **ProtectedRoute로 감싼 페이지**로 둔다.
- 예: `path="/"` → `element={<ProtectedRoute><Index /></ProtectedRoute>}`

### 3-5. 로그인 페이지 역방향 처리 (선택)

- 이미 로그인한 사용자가 `/login`에 들어오면 메인으로 보내는 게 자연스럽다.
- `/login` 라우트의 `element`에서 `isLoggedIn`이 true면 `<Navigate to="/" replace />`, 아니면 `<LoginPage />`를 렌더하도록 분기한다.

---

## 4. 코드 구조 요약

```
ProtectedRoute
├── isLoggedIn 확인 (인증 스토어에서)
├── false → <Navigate to="/login" replace />
└── true  → { children } (보호된 페이지)

라우트 구성
├── /      → ProtectedRoute 안에 메인 페이지
└── /login → 로그인됐으면 Navigate to="/", 아니면 LoginPage
```

---

## 5. 이 프로젝트에서의 사용 예 (참고)

- **인증 상태**: `useAuthStore((state) => state.isLoggedIn)`
- **보호 경로**: `/` (Index)
- **비로그인 시 이동**: `/login`
- **로그인 페이지**: 로그인됐을 때 `/`로 리다이렉트

---

*실제 구현은 `src/App.tsx`의 `ProtectedRoute` 및 `Routes` 구성을 참고한다.*
