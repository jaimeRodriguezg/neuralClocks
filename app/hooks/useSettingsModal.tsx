import { create } from "zustand";

interface SettingModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const initialState = {
  isOpen: false,
};

const useSettingModal = create<SettingModalProps>((set) => ({
  isOpen: initialState.isOpen,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSettingModal;
