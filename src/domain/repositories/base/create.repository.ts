export interface CreateRepository<T> {
    create(data: Partial<T>): T;
}
