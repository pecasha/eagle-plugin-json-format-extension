import React from "react";
import {
    Modal,
    Stack,
    Text,
    ScrollArea,
    ModalProps
} from "@mantine/core";
import { Prism } from "@mantine/prism";
import { shallow } from "zustand/shallow";
import useGraph from "src/store/useGraph";

const dataToString = (data: any) => {
    const text = Array.isArray(data) ? Object.fromEntries(data) : data;
    const replacer = (_: string, v: string) => {
        if (typeof v === "string") return v.replaceAll("\"", "");
        return v;
    };

    return JSON.stringify(text, replacer, 2);
};

const CodeBlock: React.FC<{ children: any }> = ({children}) => {
    return (
        <ScrollArea>
            <Prism
                maw={600}
                miw={350}
                mah={250}
                language="json"
                copyLabel={i18next.t("preview.node.modal.copy")}
                copiedLabel={i18next.t("preview.node.modal.copied")}
                withLineNumbers
            >
                {children}
            </Prism>
        </ScrollArea>
    );
};

export const NodeModal: React.FC<ModalProps> = ({opened, onClose}) => {
    const [nodeData, path] = useGraph(
        state => [dataToString(state.selectedNode.text), state.selectedNode.path],
        shallow
    );

    return (
        <Modal title={i18next.t("preview.node.modal.title")} size="auto" opened={opened} onClose={onClose} centered>
            <Stack py="sm" spacing="sm">
                <Stack spacing="xs">
                    <Text fz="sm" fw={700}>{i18next.t("preview.node.modal.content")}</Text>
                    <CodeBlock>{nodeData}</CodeBlock>
                </Stack>
                <Stack spacing="xs">
                    <Text fz="sm" fw={700}>{i18next.t("preview.node.modal.path")}</Text>
                    <CodeBlock>{path}</CodeBlock>
                </Stack>
            </Stack>
        </Modal>
    );
};
