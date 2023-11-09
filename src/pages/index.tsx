import React from "react";
import { useRouter } from "next/router";
import useFile from "src/store/useFile";
import useStored from "src/store/useStored";
import dynamic from "next/dynamic";

const LiveEditor = dynamic(() => import("src/containers/Editor/LiveEditor"), {
    ssr: false
});

const EditorPage: React.FC = () => {
    const {isReady, query} = useRouter();
    const setContents = useFile(state => state.setContents);
    const setLightTheme = useStored(state => state.setLightTheme);

    React.useEffect(() => {
        const fs = window.require("fs");
        if (isReady) {
            const theme = query.theme as string;
            setLightTheme(theme === "light" || theme === "lightgray");
            setContents({contents: fs.readFileSync(query.path as string, "utf-8"), hasChanges: false});
        }
    }, [isReady, setContents]);

    return (
        <LiveEditor/>
    );
};

export default EditorPage;
