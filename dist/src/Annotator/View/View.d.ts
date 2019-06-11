import * as SVG from "svg.js";
import { RepositoryRoot } from "../Infrastructure/Repository";
import { LineView } from "./Entities/LineView";
import { Annotator } from "../Annotator";
import { LabelView } from "./Entities/LabelView";
import { ConnectionView } from "./Entities/ConnectionView";
export declare class View implements RepositoryRoot {
    readonly root: Annotator;
    readonly svgDoc: SVG.Doc;
    readonly lineViewRepo: LineView.Repository;
    readonly labelViewRepo: LabelView.Repository;
    readonly connectionViewRepo: ConnectionView.Repository;
    constructor(htmlElement: HTMLElement, root: Annotator);
    readonly store: import("../Store/Store").Store;
    private construct;
    render(): void;
    resize(): void;
    export(): string;
}
