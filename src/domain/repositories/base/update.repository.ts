export interface UpdateRepository<T> {
    update(id: string, data: Partial<T>): T | null;
}