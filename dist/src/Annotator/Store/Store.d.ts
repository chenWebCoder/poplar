import { LabelCategory } from "./Entities/LabelCategory";
import { Label } from "./Entities/Label";
import { RepositoryRoot } from "../Infrastructure/Repository";
import { ConnectionCategory } from "./Entities/ConnectionCategory";
import { Connection } from "./Entities/Connection";
import { Line } from "./Entities/Line";
import { Observable } from "rxjs";
export declare class Store implements RepositoryRoot {
    content: string;
    lineRepo: Line.Repository;
    labelCategoryRepo: LabelCategory.Repository;
    labelRepo: Label.Repository;
    connectionCategoryRepo: ConnectionCategory.Repository;
    connectionRepo: Connection.Repository;
    config: {
        maxLineWidth: number;
        allowMultipleLabel: boolean;
    };
    readonly ready$: Observable<void>;
    private readonly eventEmitter;
    constructor();
    text: string;
    json: any;
    private mergeForLabel;
    private mergeLines;
}
