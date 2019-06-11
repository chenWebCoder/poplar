import { TopContextUser } from "./TopContextUser";
import * as SVG from "svg.js";
import { TopContext } from "./TopContext";
import { Label } from "../../Store/Entities/Label";
import { Base } from "../../Infrastructure/Repository";
import { View } from "../View";
export declare namespace LabelView {
    class Entity extends TopContextUser {
        readonly id: number;
        readonly store: Label.Entity;
        readonly context: TopContext;
        layer: number;
        svgElement: SVG.G;
        annotationElement: SVG.G;
        highLightElement: SVG.Rect;
        textElement: SVG.Text;
        textWidth: number;
        constructor(id: number, store: Label.Entity, context: TopContext);
        readonly x: number;
        readonly globalX: number;
        readonly globalY: number;
        readonly width: number;
        readonly highlightElementBox: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        readonly annotationElementBox: {
            text: {
                x: number;
                width: number;
            };
            container: {
                x: number;
                y: number;
                width: number;
            };
        };
        private readonly category;
        /**
         * Thanks to Alex Hornbake (function for generate curly bracket path)
         * @see http://bl.ocks.org/alexhornbake/6005176
         */
        private bracket;
        initPosition(): void;
        preRender(): void;
        removeElement(): void;
        render(): void;
        private renderHighlight;
        private renderAnnotation;
    }
    class Repository extends Base.Repository<Entity> {
        root: View;
        constructor(root: View);
        delete(key: number | Entity): boolean;
    }
}
