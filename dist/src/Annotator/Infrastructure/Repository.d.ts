/// <reference types="node" />
import { EventEmitter } from 'events';
import { Observable } from "rxjs";
export interface RepositoryRoot {
}
export declare namespace Base {
    class Repository<T> {
        root: RepositoryRoot;
        protected entities: Map<number, T>;
        protected eventEmitter: EventEmitter;
        created$: Observable<number>;
        updated$: Observable<number>;
        deleted$: Observable<T>;
        private nextId;
        constructor(root: RepositoryRoot);
        readonly json: Array<object>;
        readonly length: number;
        get(key: number): T;
        has(key: number): boolean;
        set(key: number, value: T): this;
        add(value: T): number;
        [Symbol.iterator](): Iterator<[number, T]>;
        delete(key: number | T): boolean;
    }
}
