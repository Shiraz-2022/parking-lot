import { MinHeap } from "../../domain/shared/min-heap";

/**
 * Represents a collection store that maintains data in multiple data structures
 * @template T The type of data stored in the collection
 */
type CollectionStore<T> = {
    /** Map structure for O(1) key-value lookups */
    map: Map<string, T>;
    /** Array structure for sequential access */
    array: T[];
    /** MinHeap structure for priority-based operations */
    heap: MinHeap;
};

/**
 * In-memory database implementation that manages collections of data
 * Each collection maintains data in multiple data structures (Map, Array, and MinHeap)
 * for different access patterns and operations
 */
export class InMemoryDB {
    /** Map of collection names to their respective stores */
    private collections: Map<string, CollectionStore<any>> = new Map();

    /**
     * Gets or creates a collection store for the specified name
     */
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

export const db = new InMemoryDB();
