import { Base } from "../../Infrastructure/Repository";
import { Store } from "../Store";
import { Observable } from "rxjs";
import { Connection } from "./Connection";
export declare namespace Label {
    class Entity {
        readonly id: number;
        private readonly categoryId;
        readonly startIndex: number;
        readonly endIndex: number;
        private readonly root;
        constructor(id: number, categoryId: number, startIndex: number, endIndex: number, root: Store);
        readonly category: import("./LabelCategory").LabelCategory.Entity;
        readonly json: object;
        readonly sameLineConnections: Array<Connection.Entity>;
        readonly allConnections: Set<Connection.Entity>;
    }
    class Repository extends Base.Repository<Entity> {
        readonly root: Store;
        readyToCreate$: Observable<Entity>;
        constructor(root: Store);
        set(key: number, value: Entity): this;
        getEntitiesInRange(startIndex: number, endIndex: number): Array<Entity>;
        delete(key: number | Entity): boolean;
    }
    function construct(json: any, root: Store): Entity;
    function constructAll(json: Array<any>, root: Store): Array<Entity>;
}
