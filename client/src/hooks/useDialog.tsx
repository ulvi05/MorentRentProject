import { create } from "zustand";

export enum ModalTypeEnum {
  LOGIN = "login",
  REGISTER = "register",
  FORGOT = "forgot-password",
}

interface DialogState {
  type: ModalTypeEnum | null;
  isOpen: boolean;
  openDialog: (type: ModalTypeEnum) => void;
  closeDialog: () => void;
}

export const useDialog = create<DialogState>((set) => ({
  type: null,
  isOpen: false,
  openDialog: (type: ModalTypeEnum) => set({ type, isOpen: true }),
  closeDialog: () => set({ isOpen: false, type: null }),
}));
