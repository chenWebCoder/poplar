import { Base } from "../../Infrastructure/Repository";
import { Store } from "../Store";
export declare namespace ConnectionCategory {
    class Entity {
        readonly id: number;
        readonly text: string;
        constructor(id: number, text: string);
    }
    class Repository extends Base.Repository<Entity> {
        readonly root: Store;
        constructor(root: Store);
    }
    function construct(json: any): Entity;
    function constructAll(json: Array<object>): Array<Entity>;
}
