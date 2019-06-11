import { Annotator } from "../../Annotator";
export declare class TextSelectionHandler {
    root: Annotator;
    selectLengthLimit: number;
    constructor(root: Annotator);
    getSelectionInfo(): {
        startIndex: number;
        endIndex: number;
    };
    textSelected(): void;
}
