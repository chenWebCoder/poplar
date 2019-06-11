import { Base } from "../../Infrastructure/Repository";
import { Store } from "../Store";
import { Label } from "./Label";
import { Connection } from "./Connection";
export declare namespace Line {
    class Entity {
        readonly id: number;
        readonly allContent: string;
        readonly startIndex: number;
        readonly endIndex: number;
        private readonly root;
        constructor(id: number, allContent: string, startIndex: number, endIndex: number, root: Store);
        readonly text: string;
        readonly labelsInThisLine: Array<Label.Entity>;
        isLabelInThisLine(label: Label.Entity | number): boolean;
        isConnectionInThisLine(connection: Connection.Entity | number): boolean;
    }
    class Repository extends Base.Repository<Entity> {
        readonly root: Store;
        constructor(root: Store);
    }
    function construct(root: Store): Array<Entity>;
}
