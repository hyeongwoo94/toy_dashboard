import { create } from "zustand";

export type ToastType = "error" | "success" | "warning" | "info";

interface ToastState {
    isOpen: boolean;
    message: string;
    type: ToastType;
}

interface ToastActions {
    show: (message: string, type?: ToastType) => void;
    hide: () => void;
}

export const useToastStore = create<ToastState & ToastActions>((set) => ({
    isOpen: false,
    message: "",
    type: "info",

    show: (message, type = "info") => {
        set({ isOpen: true, message, type });
        setTimeout(() => {
            set({ isOpen: false });
        }, 3000);
    },

    hide: () => set({ isOpen: false }),
}));
