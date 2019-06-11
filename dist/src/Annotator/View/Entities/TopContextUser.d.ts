import * as SVG from "svg.js";
import { TopContext } from "./TopContext";
export declare abstract class TopContextUser {
    layer: number;
    layIndex: number;
    context: TopContext;
    abstract readonly x: number;
    abstract readonly width: number;
    svgElement: SVG.Element;
    readonly y: number;
    abstract render(): any;
    abstract preRender(): any;
    abstract initPosition(): any;
    private readonly connectionLayer;
    private readonly overlapping;
    private readonly overlappingIndex;
    eliminateOverlapping(): void;
    postRender(): void;
}
