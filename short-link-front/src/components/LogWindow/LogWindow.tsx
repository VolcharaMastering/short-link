import { useLinksStore } from "../../stores/linksStore";
import "./LogWindow.scss";

const LogWindow: React.FC = () => {
    const { logData } = useLinksStore();
    return (
        <section className="log-window">
            <p className="log-window__text">{logData ? JSON.stringify(logData) : ""}</p>
        </section>
    );
};
export default LogWindow;
