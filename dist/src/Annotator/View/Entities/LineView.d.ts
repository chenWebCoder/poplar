import { Base } from "../../Infrastructure/Repository";
import { View } from "../View";
import * as SVG from "svg.js";
import { Line } from "../../Store/Entities/Line";
import { TopContext } from "./TopContext";
import { Observable } from "rxjs";
export declare namespace LineView {
    class Entity {
        readonly id: number;
        store: Line.Entity;
        readonly root: View;
        svgElement: SVG.Tspan;
        xCoordinateOfChar: Array<number>;
        y: number;
        topContext: TopContext;
        height: number;
        constructor(id: number, store: Line.Entity, root: View);
        readonly prev: Entity;
        readonly isFirst: boolean;
        readonly isLast: boolean;
        remove(): void;
        render(context: SVG.Text): void;
        renderTopContext(): void;
        layout(dy?: number): void;
        readonly rendered: boolean;
        layoutAfterSelf(dy: number): void;
        calculateInitialPosition(): void;
        private rerender;
    }
    class Repository extends Base.Repository<Entity> {
        root: View;
        rerendered$: Observable<number>;
        constructor(root: View);
        rerendered(id: number): void;
        delete(key: number | Entity): boolean;
    }
    function constructAll(root: View): Array<Entity>;
}
