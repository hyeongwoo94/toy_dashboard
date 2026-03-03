import { useAuthStore } from "../features/auth/authStore";

function Index() {
    const logout = useAuthStore((state) => state.logout);

    return (
        <>
            <p>메인페이지</p>
            <button type="button" onClick={logout}>
                로그아웃
            </button>
        </>
    );
}

export default Index;