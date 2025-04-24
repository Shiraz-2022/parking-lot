import {db} from "../../persistence/in-memory-db";
import type {HeapRepository} from "../../../domain/repositories/heap/heap.repository";
import { v4 as uuidv4 } from 'uuid';

export class InMemoryBaseRepository<T> implements HeapRepository<T> {
    protected collection: ReturnType<typeof db.getCollection<T>>;

    constructor(collectionName: string) {
        this.collection = db.getCollection<T>(collectionName);
    }

    findById(id: string, throwErrorIfNotFound: boolean = false): T | null {
        const item = this.collection.map.get(id);
        if (!item && throwErrorIfNotFound) {
            throw new Error(`Item with id '${id}' not found`);
        }
        return item || null;
    }


    findAll(): T[] {
        return [...this.collection.array];
    }

    create(data: Partial<T>): T {
        const _id = this.generateId();
        const item = { ...data, _id } as T;
        this.collection.map.set(_id, item);
        this.collection.array.push(item);
        return item;
    }

    update(_id: string, data: Partial<T>): T | null {
        const existing = this.collection.map.get(_id);
        if (!existing) return null;
        const updated = { ...existing, ...data };
        this.collection.map.set(_id, updated);
        const index = this.collection.array.findIndex(i => (i as any)._id === _id);
        if (index !== -1) this.collection.array[index] = updated;
        return updated;
    }

    delete(_id: string): void {
        this.collection.map.delete(_id);
        this.collection.array = this.collection.array.filter(i => (i as any)._id !== _id);
    }

    addToHeap(item: any): void {
        this.collection.heap.insert(item);
    }

    removeFromHeap(): any {
        return this.collection.heap.extractMin();
    }

    peekMin(): any {
        return this.collection.heap.peek();
    }

    private generateId(): string {
        return uuidv4();
    }
}
