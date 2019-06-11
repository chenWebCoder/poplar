import { Base } from "../../Infrastructure/Repository";
import { Store } from "../Store";
export declare namespace LabelCategory {
    class Entity {
        readonly id: number;
        readonly text: string;
        readonly color: string;
        readonly borderColor: string;
        constructor(id: number, text: string, color: string, borderColor: string);
    }
    class Repository extends Base.Repository<Entity> {
        readonly root: Store;
        constructor(root: Store);
    }
    function construct(json: any): Entity;
    function constructAll(json: Array<object>): Array<Entity>;
}
