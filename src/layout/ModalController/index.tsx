import React from "react";
import { ModalProps } from "@mantine/core";
import {
    Modal,
    NodeModal
} from "src/containers/Modals";
import useModal from "src/store/useModal";

type ModalComponent = { key: Modal; component: React.FC<ModalProps> };

const modalComponents: ModalComponent[] = [
    {key: "node", component: NodeModal}
];

export const ModalController = () => {
    const setVisible = useModal(state => state.setVisible);
    const modalStates = useModal(state => modalComponents.map(modal => state[modal.key]));

    return (
        <>
            {modalComponents.map(({key, component}, index) => {
                const ModalComponent = component;
                const opened = modalStates[index];

                return <ModalComponent key={key} opened={opened} onClose={() => setVisible(key)(false)}/>;
            })}
        </>
    );
};
