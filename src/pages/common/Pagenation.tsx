import CommonBtn from "../../components/CommonBtn";

interface PagenationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
}

function Pagenation({
    currentPage,
    totalPages,
    onPageChange,
    maxVisiblePages = 5,
}: PagenationProps) {
    if (totalPages <= 1) {
        return null;
    }

    const getVisiblePages = (): number[] => {
        const pages: number[] = [];
        const half = Math.floor(maxVisiblePages / 2);

        let start = Math.max(1, currentPage - half);
        const end = Math.min(totalPages, start + maxVisiblePages - 1);

        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="common_pagenation">
            <ul className="_list">
                <li className={`_item ${currentPage === 1 ? "disabled" : ""}`}>
                    <CommonBtn
                        text="<"
                        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    />
                </li>
                {visiblePages.map((page) => (
                    <li
                        key={page}
                        className={`_item ${page === currentPage ? "on" : ""}`}
                    >
                        <CommonBtn
                            text={String(page)}
                            onClick={() => onPageChange(page)}
                        />
                    </li>
                ))}
                <li className={`_item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <CommonBtn
                        text=">"
                        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    />
                </li>
            </ul>
        </div>
    );
}

export default Pagenation;
