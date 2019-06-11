import { Base } from "../../Infrastructure/Repository";
import { Store } from "../Store";
export declare namespace Connection {
    class Entity {
        readonly id: number;
        private readonly categoryId;
        private readonly fromId;
        private readonly toId;
        private readonly root;
        constructor(id: number, categoryId: number, fromId: number, toId: number, root: Store);
        readonly category: import("./ConnectionCategory").ConnectionCategory.Entity;
        readonly from: import("./Label").Label.Entity;
        readonly to: import("./Label").Label.Entity;
        readonly sameLineLabel: import("./Label").Label.Entity;
        readonly mayNotSameLineLabel: import("./Label").Label.Entity;
        readonly json: object;
    }
    class Repository extends Base.Repository<Entity> {
        readonly root: Store;
        constructor(root: Store);
    }
    function construct(json: any, root: Store): Entity;
    function constructAll(json: Array<object>, root: Store): Array<Entity>;
}
