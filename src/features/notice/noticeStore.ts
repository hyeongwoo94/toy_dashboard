import { create } from "zustand";
import type { Notice } from "./notice";
import { mockNotice } from "./mockNotice";

const NOTICE_LOCAL_STORE_KEY = "toy_dashboard.noticeStore.v2";

interface NoticeState {
    notices: Notice[];
}

interface NoticeActions {
    loadNotices: () => void;
    addNotice: (notice: Omit<Notice, "id">) => Notice;
}

function loadFromStorage(): Notice[] {
    try {
        const raw = localStorage.getItem(NOTICE_LOCAL_STORE_KEY);
        if (!raw) return [...mockNotice];
        const parsed = JSON.parse(raw) as Notice[];
        return parsed;
    } catch {
        return [...mockNotice];
    }
}

function saveToStorage(notices: Notice[]) {
    localStorage.setItem(NOTICE_LOCAL_STORE_KEY, JSON.stringify(notices));
}

export const useNoticeStore = create<NoticeState & NoticeActions>((set, get) => ({
    notices: loadFromStorage(),

    loadNotices: () => {
        set({ notices: loadFromStorage() });
    },

    addNotice: (noticeData) => {
        const notices = get().notices;
        const maxId = notices.reduce((max, n) => Math.max(max, n.id), 0);
        const newNotice: Notice = {
            ...noticeData,
            id: maxId + 1,
        };
        const updated = [newNotice, ...notices];
        saveToStorage(updated);
        set({ notices: updated });
        return newNotice;
    },
}));
