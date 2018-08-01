import {Renderable} from "../Interface/Renderable";
import * as SVG from "svg.js";
import {Sentence} from "../../Store/Sentence";
import {TextBlock} from "./TextBlock";
import {SoftLine} from "./SoftLine";
import {TextElement} from "./Base/TextElement";
import {Manager} from "./OutlineConnection/Manager";

export class HardLine extends TextElement implements Renderable {
    svgElement: SVG.Tspan;
    next: HardLine;

    constructor(public store: Sentence,
                public parent: TextBlock) {
        super(parent);
    }

    _children: Array<SoftLine> = null;

    get children(): Array<SoftLine> {
        if (this._children === null) {
            this._children = [];
            let startIndex = 0;
            while (startIndex < this.store.length) {
                let endIndex = startIndex + SoftLine.maxWidth;
                if (endIndex > this.store.length) {
                    endIndex = this.store.length;
                }
                let crossLabel = this.store.getFirstLabelCross(endIndex);
                while (crossLabel) {
                    endIndex = crossLabel.endIndexIn(this.store);
                    crossLabel = this.store.getFirstLabelCross(endIndex);
                }
                if (startIndex < endIndex) {
                    let newSoftline = new SoftLine(this, startIndex, endIndex);
                    this._children.push(newSoftline);
                }
                if (startIndex == endIndex) {
                    throw RangeError("startIndex should never equals to endIndex in getSoftLines!");
                }
                startIndex = endIndex;
            }
            for (let i = 0; i < this._children.length - 1; ++i) {
                this._children[i].next = this._children[i + 1];
            }
        }
        return this._children;
    }

    set children(value) {
        this._children = value;
    }

    render(context: SVG.Tspan) {
        this.svgElement = context.tspan('');
        this.children.map(it => it.render(this.svgElement));
    }

    rerender() {
        super.rerender();
        this.children.map(softline => {
            softline.labelViews.map(it => {
                Manager.rerenderIfNecessary(it);
            });
        });
    }
}