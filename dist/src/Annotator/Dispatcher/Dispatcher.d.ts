import { Store } from "../Store/Store";
import { Action } from "../Action/Action";
export declare class Dispatcher {
    private store;
    constructor(store: Store);
    dispatch(action: Action.IAction): void;
}
