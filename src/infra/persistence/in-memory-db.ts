// infra/persistence/InMemoryDB.ts

import { MinHeap } from "../../domain/shared/min-heap";

type CollectionStore<T> = {
    map: Map<string, T>;
    array: T[];
    heap: MinHeap;
};

export class InMemoryDB {
    private collections: Map<string, CollectionStore<any>> = new Map();

    getCollection<T>(name: string): CollectionStore<T> {
        if (!this.collections.has(name)) {
            this.collections.set(name, {
                map: new Map<string, T>(),
                array: [],
                heap: new MinHeap(),
            });
        }
        return this.collections.get(name)!;
    }
}

export const db = new InMemoryDB(); // Singleton instance
