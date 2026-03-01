import "./App.scss";
import "./theme.css";
import { useAuthStore } from "./features/auth/authStore";
import Index from "./pages/index";
import LoginPage from "./pages/login/LoginPage";

function App() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    return <>{isLoggedIn ? <Index /> : <LoginPage />}</>;
}

export default App;
