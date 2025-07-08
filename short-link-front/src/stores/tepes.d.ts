interface LinkBody {
    id: string;
    originalUrl: string;
    alias: string;
    createdAt: Date;
    expireAt?: Date | null;
    clickCount: number;
    isActive?: boolean;
}
interface LinkAnalitics {
    clicks: number;
    createdAt: Date;
    viewedIps: {
        ip: string;
        date: Date;
    }[];
}

interface LinksState {
    links: LinkBody[];
    logData: LinkBody | LinkAnalitics | null;
    getAllLinks: () => void;
    getInfoAboutLink: (alias: string) => void;
    addLink: (link: string) => void;
    getAnalitics: (alias: string) => void;
    removeLink: (alias: string) => void;
}
