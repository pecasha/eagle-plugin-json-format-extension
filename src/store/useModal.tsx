import { create } from "zustand";
import { Modal } from "src/containers/Modals";

type ModalState = {
    [key in Modal]: boolean;
};

interface ModalActions {
    setVisible: (modal: Modal) => (visible: boolean) => void;
}

const initialStates: ModalState = {
    node: false
};

const useModal = create<ModalState & ModalActions>()(set => ({
    ...initialStates,
    setVisible: modal => visible => {
        set({[modal]: visible});
    }
}));

export default useModal;
