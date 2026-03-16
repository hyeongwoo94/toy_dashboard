import { Link } from "react-router-dom";

/** 헤더 컬럼: label + 선택적 width (예: "80px", "20%", "2fr") */
export interface CommonListColumn {
    label: React.ReactNode;
    width?: string;
}

/** 행 데이터: to가 있으면 Link, 없으면 div. cells 개수는 columns 개수와 동일 */
export interface CommonListRow {
    to?: string;
    cells: React.ReactNode[];
}

interface CommonListProps {
    /** 헤더 컬럼 설정 (개수·width 부모에서 지정) */
    columns: CommonListColumn[];
    /** 바디 행 데이터. 각 row.cells 개수는 columns 개수와 같아야 함 */
    rows: CommonListRow[];
    emptyMsg: string;
}

function CommonList(props: CommonListProps) {
    const columns = Array.isArray(props?.columns) ? props.columns : [];
    const rows = Array.isArray(props?.rows) ? props.rows : [];

    const cellStyle = (width?: string) =>
        width ? { flex: `0 0 ${width}` as const, minWidth: width } : undefined;

    // 상태 텍스트에 따라 클래스명 반환 (완료/진행/요청 등)
    const getStatusClass = (text: React.ReactNode) => {
        if (typeof text !== "string") return "";
        if (text === "완료") return "done";
        if (text === "진행" || text === "진행중") return "in-progress";
        if (text === "요청") return "request";
        if (text === "검토") return "review";
        return "";
    };

    return (
        <div className="common_list">
            <div className="common_list_header">
                {columns.map((col, i) => (
                    <div
                        key={i}
                        className="_header_text"
                        style={cellStyle(col.width)}
                    >
                        {col.label}
                    </div>
                ))}
            </div>
            <div className="common_list_body_line">
                <ul className="common_list_body">
                    {rows.map((row, ri) => {
                        const content = columns.map((col, ci) => (
                            <div
                                key={ci}
                                className={`_item_td ${
                                    col.label === "상태"
                                        ? getStatusClass(row.cells?.[ci])
                                        : ""
                                }`}
                                style={cellStyle(col.width)}
                            >
                                {row.cells?.[ci]}
                            </div>
                        ));
                        return (
                            <li key={ri} className="_body_item">
                                {row.to ? (
                                    <Link
                                        to={row.to}
                                        className="_body_item_link"
                                    >
                                        {content}
                                    </Link>
                                ) : (
                                    <div className="_body_item_link">
                                        {content}
                                    </div>
                                )}
                            </li>
                        );
                    })}
                    {rows.length === 0 && (
                        <li className="_body_item">
                            <div
                                className="_body_item_link"
                                style={{
                                    justifyContent: "center",
                                    padding: "1rem",
                                }}
                            >
                                데이터가 없습니다.
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default CommonList;
