import "./App.scss";
import "./theme.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./features/auth/authStore";
import Index from "./pages/index";
import LoginPage from "./pages/login/LoginPage";
import NotFound from "./pages/error/NotFound";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    return <>{children}</>;
}

function App() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Index />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/login"
                element={
                    isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
