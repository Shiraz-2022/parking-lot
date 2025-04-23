export interface FindRepository<T> {
    findById(id: string, throwErrorIfNotFound: boolean): T | null;
    findAll(): T[];
}
