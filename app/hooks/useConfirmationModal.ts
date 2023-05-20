import { create } from "zustand";

interface ConfirmationModalStore {
  isOpen: boolean;
  email: string;
  onOpen: () => void;
  onClose: () => void;
  setEmail: (email: string) => void;
}

const initialState = {
  isOpen: false,
  email: "",
};

const useConfirmationModal = create<ConfirmationModalStore>((set) => ({
  isOpen: initialState.isOpen,
  email: initialState.email,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setEmail: (email) => set((state) => ({ ...state, email })),
}));

export default useConfirmationModal;
