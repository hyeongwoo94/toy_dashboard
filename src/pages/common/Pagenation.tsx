import CommonBtn from "../../components/CommonBtn";

function Pagenation() {
    return (
        <div className="common_pagenation">
            <ul className="_list">
                <li className="_item">
                    <CommonBtn text="<" />
                </li>
                <li className="_item on">
                    <CommonBtn text="1" />
                </li>
                <li className="_item">
                    <CommonBtn text="50" />
                </li>
                <li className="_item">
                    <CommonBtn text="100" />
                </li>
                <li className="_item">
                    <CommonBtn text=">" />
                </li>
            </ul>
        </div>
    );
}

export default Pagenation;
