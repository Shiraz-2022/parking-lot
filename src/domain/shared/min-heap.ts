export class MinHeap {
    private heap: number[];

    constructor() {
        this.heap = [];
    }

    insert(item: number): void {
        this.heap.push(item);
        this.heapifyUp();
    }

    extractMin(): number | null {
        if (this.heap.length === 0) return null;

        const minItem = this.heap[0];

        if (this.heap.length === 1) {
            this.heap.pop();
            return minItem;
        }

        this.heap[0] = this.heap.pop()!;
        this.heapifyDown(0);

        return minItem;
    }

    peek(): number | null {
        return this.heap.length === 0 ? null : this.heap[0];
    }

    size(): number {
        return this.heap.length;
    }

    private heapifyUp(): void {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    private heapifyDown(index: number): void {
        const length = this.heap.length;
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < length && this.heap[left] < this.heap[smallest]) smallest = left;
            if (right < length && this.heap[right] < this.heap[smallest]) smallest = right;
            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }

    toString(): string {
        return this.heap.toString();
    }

    isValid(): boolean {
        for (let i = 0; i < this.heap.length; i++) {
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            if (left < this.heap.length && this.heap[i] > this.heap[left]) return false;
            if (right < this.heap.length && this.heap[i] > this.heap[right]) return false;
        }
        return true;
    }
}
