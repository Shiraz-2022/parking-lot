import type {BaseRepository} from "../base/base.repository.ts";

export interface HeapRepository<T> extends BaseRepository<T> {
    addToHeap(item: any): void;
    removeFromHeap(): any;
    peekMin(): any;
}
