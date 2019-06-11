/// <reference types="node" />
import { EventEmitter } from 'events';
import { Store } from "./Store/Store";
import { View } from "./View/View";
import { Dispatcher } from "./Dispatcher/Dispatcher";
import { Action } from "./Action/Action";
import { TextSelectionHandler } from "./View/EventHandler/TextSelectionHandler";
import { TwoLabelsClickedHandler } from "./View/EventHandler/TwoLabelsClickedHandler";
export declare class Annotator extends EventEmitter {
    private htmlElement;
    config?: object;
    store: Store;
    view: View;
    dispatcher: Dispatcher;
    textSelectionHandler: TextSelectionHandler;
    twoLabelsClickedHandler: TwoLabelsClickedHandler;
    constructor(data: string | object, htmlElement: HTMLElement, config?: object);
    applyAction(action: Action.IAction): void;
    remove(): void;
    export(): string;
}
