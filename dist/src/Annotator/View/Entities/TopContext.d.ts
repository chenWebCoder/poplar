import * as SVG from "svg.js";
import { LineView } from "./LineView";
import { Observable, Subscription } from "rxjs";
import { TopContextUser } from "./TopContextUser";
export declare class TopContext {
    readonly attachTo: LineView.Entity;
    svgElement: SVG.G;
    elements: Set<TopContextUser>;
    positionChanged$: Observable<void>;
    labelCreatedSubscription: Subscription;
    labelDeletedSubscription: Subscription;
    connectionCreatedSubscription: Subscription;
    connectionDeletedSubscription: Subscription;
    rerendered$: Observable<void>;
    private eventEmitter;
    constructor(attachTo: LineView.Entity);
    _y: number;
    y: number;
    readonly height: number;
    layout(dy: number): void;
    render(): void;
    preRender(context: SVG.Doc): void;
    initPosition(): void;
    postRender(): any;
    remove(): void;
    addElement(element: TopContextUser): void;
    private positionChanged;
}
