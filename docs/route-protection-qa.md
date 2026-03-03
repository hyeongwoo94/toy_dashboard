# 라우트 보호 Q&A (Navigate, 보호 범위, ReactNode)

---

## 질문 1. React Router의 Navigate — 개념과 언제 쓰는지

### 개념

- **Navigate**는 React Router가 제공하는 **컴포넌트**다.
- 렌더되면 **지정한 경로(to)로 바로 이동(리다이렉트)** 한다.
- "이동만 하는 컴포넌트"라고 보면 된다. 링크처럼 사용자가 눌러야 하는 게 아니라, **이 컴포넌트가 화면에 나오는 순간** 이동이 일어난다.

### 언제 사용하나

| 상황 | 사용 예 |
|------|---------|
| **조건부 리다이렉트** | 로그인 안 했으면 로그인 페이지로, 로그인했으면 메인으로 보낼 때 |
| **보호된 라우트** | 인증 실패 시 로그인 페이지로 보낼 때 |
| **기본 경로** | 잘못된 URL 접근 시 `/` 등 기본 경로로 보낼 때 |

### 자주 쓰는 props

- **`to`**: 이동할 경로 (문자열, 예: `"/login"`, `"/"`)
- **`replace`**: `true`면 현재 주소를 히스토리에 남기지 않고 **교체**한다.  
  → 뒤로가기 시 "보호된 페이지 → 로그인"으로 다시 안 돌아가게 할 때 유용하다.

### 이 프로젝트에서의 예시

```tsx
// 비로그인 시 로그인 페이지로 보냄 (App.tsx ProtectedRoute 안)
if (!isLoggedIn) return <Navigate to="/login" replace />;

// 이미 로그인한데 /login에 오면 메인으로 보냄 (App.tsx /login 라우트)
element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
```

- **Navigate vs useNavigate**:  
  - **Navigate**: "이 컴포넌트가 렌더될 때 곧바로 이동"할 때 (조건부 리다이렉트에 적합).  
  - **useNavigate()**: 버튼 클릭 등 **이벤트 안에서** 이동할 때 사용 (예: 로그인 성공 후 `navigate('/')`).

---

## 질문 2. 어떤 컴포넌트를 보호할지, 범위는 어떻게 정하는지

### 어떤 컴포넌트가 보호가 필요한가

- **로그인한 사용자만 봐야 하는 화면(페이지)** 에 해당하는 컴포넌트가 보호 대상이다.
- 이 프로젝트에서는 **메인(대시보드)** 가 그렇다. → `Index` 페이지.
- **로그인 페이지(LoginPage)** 는 "비로그인일 때만 보여주고, 로그인했으면 메인으로 보내는" 식으로 **역방향**만 처리하면 된다. (보호 대상이 아니라 "리다이렉트 대상")

### 범위를 어떻게 지정하는가

- **라우트 단위**로 지정한다. React Router의 **Route**의 **element**를 **ProtectedRoute로 감싼 페이지**로 두면, "그 경로 = 보호된 경로"가 된다.
- 즉, **보호가 필요한 Route**에만 `<ProtectedRoute><페이지 /></ProtectedRoute>`를 넣고, 나머지 Route는 그대로 두면 된다.

### 이 프로젝트에서의 예시

```tsx
// 보호할 경로: / (메인)
// 범위 지정: 해당 Route의 element를 ProtectedRoute로 감싼다.
<Route
    path="/"
    element={
        <ProtectedRoute>
            <Index />
        </ProtectedRoute>
    }
/>

// 보호하지 않는 경로: /login (누구나 접근 가능, 대신 로그인됐으면 / 로 보냄)
<Route path="/login" element={...} />
```

- **정리**:  
  - **보호가 필요한 컴포넌트** = 로그인해야 보여줄 **페이지 컴포넌트** (여기서는 `Index`).  
  - **범위** = 그 페이지를 렌더하는 **Route** 하나에만 `ProtectedRoute`를 씌우면 된다.  
  - 나중에 `/dashboard`, `/settings` 같은 경로를 추가하면, 그 Route들도 같은 방식으로 `<ProtectedRoute><Dashboard /></ProtectedRoute>` 처럼 감싸면 된다.

---

## 질문 3. React.ReactNode가 뭔지, 타입을 왜 이걸로 두는지

### React.ReactNode란

- React가 **렌더할 수 있는 값**을 넓게 담는 타입이다.
- 다음을 **전부 포함**한다:
  - `ReactElement` (JSX로 만든 요소, 예: `<Index />`)
  - 문자열, 숫자
  - `null`, `undefined`
  - `boolean`
  - `ReactNode` 배열 (Fragment 등)
  - 등등

즉, "화면에 올 수 있는 모든 것"에 가까운 타입이다.

### children 타입을 React.ReactNode로 두는 이유

- **ProtectedRoute**의 `children`에는 "보호된 **페이지 컴포넌트**"를 넘긴다.  
  예: `<ProtectedRoute><Index /></ProtectedRoute>` → `children`은 `<Index />`이다.
- `<Index />`는 **ReactElement**이고, React는 **컴포넌트, 요소, 문자열, 배열** 등 다양한 형태를 자식으로 받을 수 있기 때문에, **가장 넓게 받는 타입**인 `React.ReactNode`를 쓰면 **어떤 형태의 자식이 와도** 타입 에러가 나지 않는다.
- `React.ReactElement`만 쓰면 "오직 요소만" 받게 되어, 나중에 Fragment나 조건부로 다른 걸 넣을 때 타입이 맞지 않을 수 있다.  
  **children = "화면에 그릴 수 있는 뭔가"** 라고만 보면 되므로, `React.ReactNode`가 적절하다.

### 이 프로젝트에서의 예시

```tsx
// children에 <Index /> (ReactElement)가 들어감
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    return <>{children}</>;  // children을 그대로 렌더
}

// 사용처: children으로 페이지 컴포넌트를 넘김
<ProtectedRoute>
    <Index />
</ProtectedRoute>
```

- `children` 타입을 `React.ReactNode`로 두었기 때문에 `<Index />` 같은 JSX, 나중에 `<><Index /><Other /></>` 같은 Fragment도 그대로 받을 수 있다.

---

## 요약

| 질문 | 요약 |
|------|------|
| **Navigate** | "렌더되면 해당 경로로 이동"하는 컴포넌트. 조건부 리다이렉트(로그인 여부 등)에 사용. `to`, `replace`로 목적지와 히스토리 동작 지정. |
| **보호 대상과 범위** | "로그인한 사람만 볼 페이지"를 보호 대상으로 하고, 그 **Route**의 **element**를 `<ProtectedRoute><페이지 /></ProtectedRoute>`로 감싸서 범위를 지정한다. |
| **React.ReactNode** | "렌더 가능한 모든 값"을 나타내는 타입. `children`이 컴포넌트, 요소, Fragment 등 뭐가 와도 받을 수 있게 하려면 이 타입을 쓰면 된다. |
