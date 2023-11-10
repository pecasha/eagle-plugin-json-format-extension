import React from "react";
import { useRouter } from "next/router";
import useFile from "src/store/useFile";
import useStored from "src/store/useStored";
import useGraph from "src/store/useGraph";
import dynamic from "next/dynamic";
import { toBlob } from "html-to-image";

const LiveEditor = dynamic(() => import("src/containers/Editor/LiveEditor"), {
    ssr: false
});

const EditorPage: React.FC = () => {
    const {isReady, query} = useRouter();
    const setContents = useFile(state => state.setContents);
    const setLightTheme = useStored(state => state.setLightTheme);
    const loading = useGraph(state => state.loading);
    const nodes = useGraph(state => state.nodes);

    React.useEffect(() => {
        if (isReady) {
            const theme = query.theme as string;
            setLightTheme(theme === "light" || theme === "lightgray");
            const isThumbnail = Boolean(Number(query.thumbnail));
            const _window = (isThumbnail ? window.parent : window) as any;
            const fs = _window.require("fs");
            setContents({contents: fs.readFileSync(query.path as string, "utf-8"), hasChanges: false});

        }
    }, [isReady, setContents]);

    React.useEffect(() => {
        if(!loading) {
            const isThumbnail = Boolean(Number(query.thumbnail));
            const _window = (isThumbnail ? window.parent : window) as any;
            if(isThumbnail) {
                if(nodes.length > 3000) {

                } else {
                    const retry = async () => {
                        const imageElement = document.querySelector("svg[id*='ref']") as HTMLElement;
                        const blob = await toBlob(imageElement, {
                            quality: 1,
                            backgroundColor: "transparent",
                        });
                        if(blob) {
                            _window.onThumbnail(blob);
                        } else {
                            setTimeout(retry, 300);
                        }
                    }
                    retry();
                }
            }
        }
    }, [loading]);

    return (
        <LiveEditor/>
    );
};

export default EditorPage;
