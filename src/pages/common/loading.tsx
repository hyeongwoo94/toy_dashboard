export default function Loading() {
    return (
        <div className="loading_wrap" aria-busy="true" aria-label="로딩 중">
            <div className="loading_spinner" />
            <p className="loading_text">로딩 중...</p>
        </div>
    );
}
