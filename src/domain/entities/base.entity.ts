/**
 * Base class for all entities.
 */
export abstract class BaseEntity<T> {
    constructor(entity: Partial<T>) {
        Object.assign(this, entity); // Assign all props directly to the instance
    }

    abstract getKey(): string;
}

/**
 * Entity class with id support.
 */
export class Entity<T> extends BaseEntity<T> {
    public readonly _id: string; // Consistent naming with underscore

    constructor(entity: Partial<T>) {
        super(entity);
    }

    getKey(): string {
        return this._id;
    }
}