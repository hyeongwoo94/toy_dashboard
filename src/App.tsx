import "./App.scss";
import "./theme.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./features/auth/authStore";
import Index from "./pages/index";
import LoginPage from "./pages/login/LoginPage";
import NotFound from "./pages/error/NotFound";
import SubPageLayout from "./pages/common/SubPageLayout";
import TaskList from "./pages/task/TaskList";
import TaskEdit from "./pages/task/TaskEdit";
import TaskView from "./pages/task/TaskView";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    return <>{children}</>;
}

function App() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    return (
        <Routes>
            {/* 메인페이지 */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Index />
                    </ProtectedRoute>
                }
            />
            {/* 로그인페이지 */}
            <Route
                path="/login"
                element={
                    isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />
                }
            />
            {/* 404 페이지 */}
            <Route path="*" element={<NotFound />} />
            {/* task페이지 */}
            <Route
                path="/task"
                element={
                    <ProtectedRoute>
                        <SubPageLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<TaskList />} />
                <Route path="edit" element={<TaskEdit />} />
                <Route path="edit/:id" element={<TaskEdit />} />
                <Route path="view/:id" element={<TaskView />} />
            </Route>
        </Routes>
    );
}

export default App;
