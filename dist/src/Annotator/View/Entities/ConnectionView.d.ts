import { TopContextUser } from "./TopContextUser";
import * as SVG from "svg.js";
import { View } from "../View";
import { Connection } from "../../Store/Entities/Connection";
import { Base } from "../../Infrastructure/Repository";
import { TopContext } from "./TopContext";
import { Subscription } from "rxjs";
export declare namespace ConnectionView {
    class Entity extends TopContextUser {
        readonly id: number;
        readonly store: Connection.Entity;
        readonly context: TopContext;
        svgElement: SVG.G;
        textElement: SVG.Text;
        lineElement: SVG.Path;
        layer: number;
        positionChangedSubscription: Subscription;
        rerenderedSubscription: Subscription;
        width: number;
        constructor(id: number, store: Connection.Entity, context: TopContext);
        readonly x: number;
        readonly from: import("./LabelView").LabelView.Entity;
        readonly to: import("./LabelView").LabelView.Entity;
        readonly prior: import("./LabelView").LabelView.Entity;
        readonly posterior: import("./LabelView").LabelView.Entity;
        private readonly category;
        readonly inline: boolean;
        initPosition(): void;
        preRender(): void;
        render(): void;
        rerenderLines(): void;
        eliminateOverlapping(): void;
        postRender(): void;
        remove(): void;
        private renderLines;
    }
    class Repository extends Base.Repository<Entity> {
        root: View;
        constructor(root: View);
        delete(key: number | Entity): boolean;
    }
}
