import { useLinksStore } from "../../stores/linksStore";
import "./AllUrls.scss";

const AllUrls: React.FC = () => {
    const { getAllLinks, links, getInfoAboutLink, getAnalitics, removeLink } = useLinksStore();
    const handleGetAllUrls = async () => {
        try {
            await getAllLinks();
        } catch (error) {
            console.error("Error fetching all URLs:", error);
        }
    };
    return (
        <section className="all-urls">
            <button className="all-urls__button" onClick={handleGetAllUrls}>
                Get All Urls
            </button>
            {links.length > 0 ? (
                <ul className="all-urls__list">
                    {links.map((link) => (
                        <li key={link.alias} className="all-urls__item">
                            <p className="all-urls__alias">{link.alias}</p>
                            <button
                                className="get-info"
                                onClick={() => getInfoAboutLink(link.alias)}
                            >
                                Get Info
                            </button>
                            <button
                                className="get-analytics"
                                onClick={() => getAnalitics(link.alias)}
                            >
                                Get Analytics
                            </button>
                            <button className="delete-link" onClick={() => removeLink(link.alias)}>
                                Delete Link
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="all-urls__empty">Press the button to get all urls</p>
            )}
        </section>
    );
};
export default AllUrls;
