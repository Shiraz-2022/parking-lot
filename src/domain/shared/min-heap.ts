export class MinHeap {
    private heap: any[];

    constructor() {
        this.heap = [];
    }

    insert(item: any): void {
        this.heap.push(item);
        this.heapifyUp();
    }

    extractMin(): any {
        if (this.heap.length === 0) return null;

        const minItem = this.heap[0];
        const lastItem = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = lastItem!;
            this.heapifyDown();
        }

        return minItem;
    }

    peek(): any {
        if (this.heap.length === 0) return null;
        return this.heap[0];
    }

    private heapifyUp(): void {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].availability <= this.heap[index].availability) break;

            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    private heapifyDown(): void {
        let index = 0;
        while (index < this.heap.length) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let smallest = index;

            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].availability < this.heap[smallest].availability) {
                smallest = leftChildIndex;
            }

            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].availability < this.heap[smallest].availability) {
                smallest = rightChildIndex;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}
