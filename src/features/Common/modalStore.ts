import { create } from "zustand";

export interface ModalState {
    isOpen: boolean;
    /** 모달에 보여줄 문구 (예: "정말 삭제하겠습니까?") */
    content: string;
    onConfirmText: string;
    onCancelText: string;
    /** 확인 버튼 클릭 시 실행 (닫기는 스토어에서 처리) */
    onConfirm?: () => void;
    /** 취소 버튼 클릭 시 실행 (닫기는 스토어에서 처리) */
    onCancel?: () => void;
}

export interface ModalActions {
    open: (options: {
        content: string;
        /** 확인 버튼 문구 (기본: "확인") */
        onConfirmText?: string;
        /** 취소 버튼 문구 (기본: "취소") */
        onCancelText?: string;
        onConfirm?: () => void;
        onCancel?: () => void;
    }) => void;
    close: () => void;
}

const initialState: ModalState = {
    isOpen: false,
    content: "",
    onConfirmText: "",
    onCancelText: ""
};

export const useModalStore = create<ModalState & ModalActions>((set) => ({
    ...initialState,

    open: ({ content, onConfirmText = "확인", onCancelText = "취소", onConfirm, onCancel }) =>
        set({
            isOpen: true,
            content,
            onConfirmText,
            onCancelText,
            onConfirm,
            onCancel,
        }),

    close: () =>
        set({
            isOpen: false,
            content: "",
            onConfirmText: "",
            onCancelText: "",
            onConfirm: undefined,
            onCancel: undefined,
        }),
}));
