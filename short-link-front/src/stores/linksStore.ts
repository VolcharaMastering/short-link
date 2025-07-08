import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosInstance from "../config/axiosInstance";

export const useLinksStore = create<LinksState>()(
    devtools((set) => ({
        links: [],
        logData: null,
        getAllLinks: async () => {
            const response = await axiosInstance.get("/");
            const links = response.data;
            links.forEach((link: LinkBody) => {
                if (!link.expireAt || link.expireAt < new Date()) {
                    link.isActive = true;
                }
            });
            set(() => ({ links }));
        },
        getInfoAboutLink: async (alias: string) => {
            const response = await axiosInstance.get(`/info/${alias}`);
            if (!response.data) {
                throw new Error("Link not found");
            }
            set({ logData: response.data });
            return response.data as LinkBody;
        },
        addLink: async (link: string, alias?: string, expireAt?: Date | null) => {
            const response = await axiosInstance.post("/shorten", {
                originalUrl: link,
                alias,
                expireAt,
            });
            const newLink = response.data as LinkBody;
            set((state) => ({
                links: [...state.links, newLink],
            }));
            return newLink;
        },
        getAnalitics: async (alias: string) => {
            const response = await axiosInstance.get(`/analytics/${alias}`);
            if (!response.data) {
                throw new Error("Analytics not found for this link");
            }
            set({ logData: response.data });
            return response.data as LinkAnalitics;
        },
        removeLink: async (alias: string) => {
            try {
                await axiosInstance.delete(`/delete/${alias}`);
                set((state) => ({
                    links: state.links.filter((link) => link.alias !== alias),
                }));
            } catch (error) {
                console.error("Error removing link:", error);
            }
        },
    }))
);
