import { useState } from "react";
import CommonBtn from "../../components/CommonBtn";
import Pagenation from "../common/Pagenation";
import {
    defaultExplainTabId,
    explainTabs,
    type ExplainTabId,
} from "./data/explainTabs";

const ITEMS_PER_PAGE = 5;

function ExplainPage() {
    const [activeTab, setActiveTab] =
        useState<ExplainTabId>(defaultExplainTabId);
    const [currentPage, setCurrentPage] = useState(1);
    const currentTab =
        explainTabs.find((tab) => tab.id === activeTab) ?? explainTabs[0];

    const totalItems = currentTab.items.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const validCurrentPage = Math.min(
        Math.max(1, currentPage),
        Math.max(1, totalPages),
    );
    const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = currentTab.items.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE,
    );

    const handleTabChange = (tabId: ExplainTabId) => {
        setActiveTab(tabId);
        setCurrentPage(1);
    };

    return (
        <div className="explain_sec">
            <div className="-head">
                <h2 className="-title">{currentTab.label}</h2>
                <p className="-summary">{currentTab.summary}</p>
            </div>

            <div className="tab_btn_layout -explain_tabs">
                {explainTabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`_btn ${activeTab === tab.id ? "on" : ""}`}
                    >
                        <CommonBtn
                            text={tab.label}
                            onClick={() => handleTabChange(tab.id)}
                        />
                    </div>
                ))}
            </div>

            <div className="-panel">
                <ul className="-item_list">
                    {paginatedItems.map((item) => (
                        <li key={item.title} className="-item">
                            <h3 className="-item_title">{item.title}</h3>
                            <p className="-item_desc">{item.description}</p>
                            {item.rationale && (
                                <p className="-item_rationale">
                                    {item.rationale}
                                </p>
                            )}
                            {item.keywords && item.keywords.length > 0 && (
                                <div className="-keywords">
                                    {item.keywords.map((keyword) => (
                                        <span key={keyword} className="-tag">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
                {totalItems > ITEMS_PER_PAGE && (
                    <div className="-pagenation">
                        <Pagenation
                            currentPage={validCurrentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExplainPage;
