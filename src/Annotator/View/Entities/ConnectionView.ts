import {TopContextUser} from "./TopContextUser";
import * as SVG from "svg.js";
import {View} from "../View";
import {Connection} from "../../Store/Entities/Connection";
import {ConnectionCategory} from "../../Store/Entities/ConnectionCategory";
import {Base} from "../../Infrastructure/Repository";
import {TopContext} from "./TopContext";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {assert} from "../../Infrastructure/Assert";

export namespace ConnectionView {
    export class Entity extends TopContextUser {
        svgElement: SVG.G = null;
        textElement: SVG.Text = null;
        lineElement: SVG.Path = null;
        layer: number;
        positionChangedSubscription: Subscription = null;
        rerenderedSubscription: Subscription = null;
        width: number;

        constructor(
            public readonly id: number,
            public readonly store: Connection.Entity,
            public readonly context: TopContext
        ) {
            super();
        }

        get x(): number {
            return (this.from.annotationElementBox.container.x + this.to.annotationElementBox.container.x + this.to.annotationElementBox.container.width - this.width) / 2;
        }

        get from() {
            return this.context.attachTo.root.labelViewRepo.get(this.store.from.id);
        }

        get to() {
            return this.context.attachTo.root.labelViewRepo.get(this.store.to.id);
        }

        get prior() {
            return this.context.attachTo.root.labelViewRepo.get(this.store.sameLineLabel.id);
        }

        get posterior() {
            return this.context.attachTo.root.labelViewRepo.get(this.store.mayNotSameLineLabel.id);
        }

        private get category(): ConnectionCategory.Entity {
            return this.store.category;
        }

        get inline() {
            return this.posterior.context === this.prior.context;
        }

        initPosition() {
            // 关系连接线 rect 宽度
            this.width = this.textElement.bbox().width;
        }

        preRender() {
            this.svgElement = this.context.svgElement.group();
            this.textElement = this.svgElement.text(this.category.text).font({size: 12}).back();
            this.textElement.style({
                '-webkit-user-select': 'none',
                '-khtml-user-select': 'none',
                '-moz-user-select': 'none',
                '-ms-user-select': 'none',
                'user-select': 'none',
            });
            this.svgElement.on('contextmenu', (e) => {
                this.context.attachTo.root.root.emit('connectionRightClicked', this.id, e.clientX, e.clientY);
                e.preventDefault();
            });
            this.svgElement.addClass('connection-view');
            // to deceive svg.js not to call bbox when call x() and y()
            // bad for svg.js
            this.svgElement.attr('x', "");
            this.svgElement.attr('y', "");
            this.textElement.attr('x', "");
            this.textElement.attr('y', "");
        }

        render() {
            // 关系连接线上的文本
            this.svgElement.rect(this.width, 12).y(5).fill('white').back();
            // this.svgElement.rect(this.width, 12).y(5).fill('red').back();
            this.svgElement.x(this.x);
            this.svgElement.y(this.y);
        }

        rerenderLines() {
            assert(this.svgElement !== null, "should already unsub");
            this.svgElement.x(this.x);
            this.svgElement.y(this.y);
            this.lineElement.remove();
            this.renderLines();
        }

        eliminateOverlapping() {
            if (this.prior.context === this.posterior.context) {
                this.layer = Math.max(this.prior.layer, this.posterior.layer) + 1;                
            } else {
                this.layer = this.prior.layer + 1;
            }
            super.eliminateOverlapping();
        }

        postRender() {
            if (this.lineElement !== null) {
                this.lineElement.remove();
            }
            this.renderLines();
        }

        remove() {
            this.textElement.remove();
            this.lineElement.remove();
            this.svgElement.remove();
            if (this.positionChangedSubscription !== null)
                this.positionChangedSubscription.unsubscribe();
            this.rerenderedSubscription.unsubscribe();
            this.textElement = null;
            this.lineElement = null;
            this.svgElement = null;
            // this.positionChangedSubscription = null;
            // this.rerenderedSubscription = null;
        }

        private renderLines() {
            let thisY = 0;
            let fromY = 0;
            let toY = 0;
            let context: SVG.Container = null;
            // 连接线 connection
            if (this.inline) {
                fromY = this.from.y;
                thisY = this.y + 11;
                // thisY = this.y + 20;
                toY = this.to.y;
                context = this.context.svgElement;
            } else {
                // Label
                fromY = this.from.y + this.from.context.y;
                thisY = this.y + this.context.y + 11;
                // thisY = this.y + this.context.y + 20;
                toY = this.to.y + this.to.context.y;
                context = (this.svgElement.doc() as SVG.Doc);
            }

            

            // 记录当前 thisY
            // let thisYNew = thisY;
            // while(lineY.indexOf(thisY) !== -1) {
            //     thisY -= 20;
            //     // thisY = this.y + this.context.y + 11;
            // }
            // lineY.push(thisY);

            // console.log('tthis.from:', this.from);
            // console.log('from', this.from.annotationElementBox.container);
            // console.log('to', this.to.annotationElementBox.container);
            // console.log('fromY, toY', fromY, toY);
            // console.log('thisY', thisY);
            console.log('**************************,' , this);
            let index = this.layIndex - 2;
            if (index < 0) index = 0
            // let thisYTest = thisY - (this.layIndex - 1) * 20;
            let thisYTest = thisY;

            const fromX = this.from.annotationElementBox.container.x;
            const fromWidth = this.from.annotationElementBox.container.width;
            const toX= this.to.annotationElementBox.container.x;
            const toWidth = this.to.annotationElementBox.container.width;

            // console.log('起始 X 坐标：', fromX);
            // console.log('终止 X 坐标：', toX);
            
            // 终止点 位于 起始点 的 水平右方
            if (fromX < toX) {
                this.lineElement = context.path(
                    `
                M ${fromX}                    ${fromY}
                C ${fromX - 10}               ${thisYTest},
                  ${fromX - 10}               ${thisYTest},
                  ${fromX}                    ${thisYTest}
                L ${this.x}                         ${thisY}
                M ${this.x + this.width}            ${thisY}
                L ${toX + toWidth}      ${thisY}
                C ${toX + toWidth + 10} ${thisY},
                  ${toX + toWidth + 10} ${thisY},
                  ${toX + toWidth}      ${toY}
                `).stroke('black').fill('transparent');
            } else {
                //  终止点 位于 起始点 的 水平左方
                this.lineElement = context.path(
                    `
                M ${fromX + fromWidth}      ${fromY}
                C ${fromX + fromWidth + 10} ${thisY},
                  ${fromX + fromWidth + 10} ${thisY},
                  ${fromX + fromWidth}      ${thisY}
                L ${this.x + this.width}                ${thisY}
                M ${this.x}                             ${thisY}
                L ${toX}                          ${thisY}
                C ${toX - 10}                     ${thisY},
                  ${toX - 10}                     ${thisY},
                  ${toX}                          ${toY}
                `).stroke('black').fill('transparent');
            }
            

            // // 终止点 位于 起始点 的 水平右方
            // if (fromX < toX) {
            //     this.lineElement = context.path(
            //         `
            //     M ${fromX}                    ${fromY}
            //     C ${fromX - 10}               ${thisY},
            //       ${fromX - 10}               ${thisY},
            //       ${fromX}                    ${thisY}
            //     L ${this.x}                         ${thisY}
            //     M ${this.x + this.width}            ${thisY}
            //     L ${toX + toWidth}      ${thisY}
            //     C ${toX + toWidth + 10} ${thisY},
            //       ${toX + toWidth + 10} ${thisY},
            //       ${toX + toWidth}      ${toY}
            //     `).stroke('black').fill('transparent');
            // } else {
            //     //  终止点 位于 起始点 的 水平左方
            //     this.lineElement = context.path(
            //         `
            //     M ${fromX + fromWidth}      ${fromY}
            //     C ${fromX + fromWidth + 10} ${thisY},
            //       ${fromX + fromWidth + 10} ${thisY},
            //       ${fromX + fromWidth}      ${thisY}
            //     L ${this.x + this.width}                ${thisY}
            //     M ${this.x}                             ${thisY}
            //     L ${toX}                          ${thisY}
            //     C ${toX - 10}                     ${thisY},
            //       ${toX - 10}                     ${thisY},
            //       ${toX}                          ${toY}
            //     `).stroke('black').fill('transparent');
            // }
            this.lineElement.marker('end', 5, 5, function (add) {
                add.polyline('0,0 5,2.5 0,5 0.2,2.5');
            });
            this.lineElement.back();
            // 鼠标移入关系连接线
            this.lineElement.on('mouseover', () => {
                this.lineElement.stroke({width: 4, color: 'red'});
                this.svgElement.fill({color: 'red'});
            });
            // 鼠标移入关系连线上的文本
            this.svgElement.on('mouseover', () => {
                this.lineElement.stroke({width: 4, color: 'red'});
                this.svgElement.fill({color: 'red'});
            });
            this.lineElement.on('mouseout', () => {
                this.lineElement.stroke({width: 1, color: 'black'});
                this.svgElement.fill({color: 'black'});
            });
            this.svgElement.on('mouseout', () => {
                this.lineElement.stroke({width: 1, color: 'black'});
                this.svgElement.fill({color: 'black'});
            });
            if (this.positionChangedSubscription !== null) {
                this.positionChangedSubscription.unsubscribe();
            }
            if (this.rerenderedSubscription !== null) {
                this.rerenderedSubscription.unsubscribe();
            }
            if (this.posterior.context !== this.prior.context)
                this.positionChangedSubscription = this.posterior.context.positionChanged$.subscribe(() => {
                    assert(this.svgElement !== null, "should already unsub");
                    this.rerenderLines();
                });
            this.rerenderedSubscription = this.context.attachTo.root.lineViewRepo.rerendered$.pipe(
                filter(it => it === this.posterior.context.attachTo.id)
            ).subscribe(() => this.rerenderLines());
        }
    }

    export class Repository extends Base.Repository<Entity> {
        root: View;

        constructor(root: View) {
            super(root);
        }


        delete(key: number | Entity): boolean {
            if (typeof key !== "number") {
                key = key.id;
            }
            if (this.has(key)) {
                this.get(key).remove();
            }
            return super.delete(key);
        }
    }
}