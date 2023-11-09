import debounce from "lodash.debounce";
import { create } from "zustand";
import useJson from "./useJson";

type SetContents = {
    contents?: string;
    hasChanges?: boolean;
    skipUpdate?: boolean;
};

interface JsonActions {
    getContents: () => string;
    getHasChanges: () => boolean;
    setError: (error: object | null) => void;
    setHasChanges: (hasChanges: boolean) => void;
    setContents: (data: SetContents) => void;
    clear: () => void;
    setFile: (fileData: File) => void;
    setJsonSchema: (jsonSchema: object | null) => void;
}

export type File = {
    _id: string;
    name: string;
    json: string;
    private: boolean;
    createdAt: string;
    updatedAt: string;
};

const initialStates = {
    fileData: null as File | null,
    contents: "{init:true}",
    error: null as any,
    hasChanges: false,
    jsonSchema: null as object | null
};

export type FileStates = typeof initialStates;

const debouncedUpdateJson = debounce(
    (value: unknown) => useJson.getState().setJson(JSON.stringify(value, null, 2)),
    800
);

const useFile = create<FileStates & JsonActions>()((set, get) => ({
    ...initialStates,
    clear: () => {
        set({contents: ""});
        useJson.getState().clear();
    },
    setJsonSchema: jsonSchema => {
        set({jsonSchema});
    },
    setFile: fileData => {
        set({fileData});
        get().setContents({contents: fileData.json, hasChanges: false});
    },
    getContents: () => get().contents,
    getHasChanges: () => get().hasChanges,
    setContents: async ({contents, hasChanges = true}) => {
        try {
            set({...(contents && {contents}), error: null, hasChanges});
            debouncedUpdateJson(contents);
        } catch (error: any) {
            if (error?.mark?.snippet) return set({error: error.mark.snippet});
            if (error?.message) set({error: error.message});
        }
    },
    setError: error => set({error}),
    setHasChanges: hasChanges => set({hasChanges})
}));

export default useFile;
