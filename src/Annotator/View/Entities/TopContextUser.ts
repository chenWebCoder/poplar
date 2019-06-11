import * as SVG from "svg.js";
import {TopContext} from "./TopContext";

export abstract class TopContextUser {
    layer: number;
    layIndex: number;

    context: TopContext;

    abstract readonly x: number;

    abstract readonly width: number;
    svgElement: SVG.Element;

    // 左下角在render context中的坐标
    get y() {
        // return -(this.layer - 1) * 30 - this.context.attachTo.height / 2 - 15 - (-0.5 * this.context.attachTo.height + 10);
        return -(this.layer - 1) * 30 - this.context.attachTo.height / 2 - 15 - (-0.5 * this.context.attachTo.height + 10);
    }

    abstract render()

    abstract preRender()

    abstract initPosition()

    // 获取连接线 layer
    private get connectionLayer() {
        return 10;
    }

    private get overlapping() {
        // console.log(this.posterior);
        // this.posterior.context === this.prior.context
        // console.log('数据: ', this);
        let allElementsInThisLayer = new Set();
        for (let ele of this.context.elements) {
            if (ele !== this && ele.layer === this.layer) {
                allElementsInThisLayer.add(ele);
            }
        }
        // console.log(this.inline)
        console.log('统计的结果', [...allElementsInThisLayer]);
        let thisLeftX = this.x;
        let width = this.width;
        // if ([...allElementsInThisLayer.keys()].length) return true;
        for (let other of allElementsInThisLayer) {
            // console.log('---->', other);
            // if (other) xreturn true;

            let thisRightX = thisLeftX + width;
            let otherLeftX = other.x;
            let otherWidth = other.width;
            let otherRightX = otherLeftX + otherWidth;
            if (thisLeftX <= otherLeftX && otherLeftX <= thisRightX) return true;
            if (thisLeftX <= otherRightX && otherRightX <= thisRightX) return true;
            if (thisLeftX <= otherLeftX && otherRightX <= thisRightX) return true;
            if (otherLeftX <= thisLeftX && thisRightX <= otherRightX) return true;

            // if ((thisLeftX <= otherLeftX && otherLeftX <= thisRightX) ||
            //     (thisLeftX <= otherRightX && otherRightX <= thisRightX) ||
            //     (thisLeftX <= otherLeftX && otherRightX <= thisRightX) ||
            //     (otherLeftX <= thisLeftX && thisRightX <= otherRightX)) {
            //     return true;
            // }
        }
        return false;
    }

    private get overlappingIndex() {
        let allElementsInThisLayer = new Set();
        for (let ele of this.context.elements) {
            if (ele !== this && ele.layIndex === this.layIndex) {
                allElementsInThisLayer.add(ele);
            }
        }

        // console.log('???????', [...allElementsInThisLayer.keys()].length)

        if ([...allElementsInThisLayer.keys()].length) return true;
        return false;
        // return [...allElementsInThisLayer.keys()].length === 0;
    }

    eliminateOverlapping() {
        console.log('**********************');
        console.log(this);
        // console.log('当前节点是连接线吗？', this./);
        console.log('this.layer  start', this.layer);
        while (this.overlapping) {
            ++this.layer;
        }
        console.log('this.layer end', this.layer);

        // 获取 connection layer
        // this.layIndex = 0;
        // this.layIndex = this.connectionLayer;

        // this.overlappingIndex
        // this.layIndex = 0;
        // while (this.overlappingIndex) {
        //     ++this.layIndex;
        // }
    }

    postRender() {
    }
}
