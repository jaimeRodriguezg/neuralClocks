import { create } from "zustand";

interface LoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const initialState = {
  isOpen: false,
};

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: initialState.isOpen,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
