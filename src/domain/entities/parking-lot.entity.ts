import { ParkingSlot } from './parking-slot.entity';
import { Vehicle } from './vehicle.entity';
import type { Color } from "../enums/color.enum.ts";
import { MinHeap } from '../shared/min-heap'; // 👈 Import your heap class

export class ParkingLot {
    private _slots: ParkingSlot[] = [];
    private _availableSlotsHeap: MinHeap; // 👈 MinHeap to track available slots

    constructor(private capacity: number) {
        this._availableSlotsHeap = new MinHeap();
        this._initializeSlots(capacity);
    }

    private _initializeSlots(capacity: number) {
        for (let i = 1; i <= capacity; i++) {
            this._slots.push(new ParkingSlot(i));
            this._availableSlotsHeap.insert(i);
        }
    }

    public getTotalSlots() {
        return this._slots.length;
    }

    public getAllSlots() {
        return this._slots;
    }

    public getSlotByNumber(slotNumber: number): ParkingSlot | null {
        const slot = this._slots[slotNumber];
        return slot ?? null;
    }

    public expand(additionalSlots: number) {
        const currentSize = this._slots.length;
        for (let i = 1; i <= additionalSlots; i++) {
            const newSlotNumber = currentSize + i;
            this._slots.push(new ParkingSlot(newSlotNumber));
            this._availableSlotsHeap.insert(newSlotNumber); // Add to heap
        }
    }

    public park(vehicle: Vehicle): ParkingSlot | null {
        const nextAvailable = this._availableSlotsHeap.extractMin();
        if (nextAvailable == null) return null;

        const slot = this.getSlotByNumber(nextAvailable);
        if (!slot) throw new Error("Slot not found");

        slot.park(vehicle);
        return slot;
    }

    public leaveBySlot(slot: ParkingSlot): ParkingSlot | null {
        const parkingSlot = this._slots[slot.slotNumber];
        if (!parkingSlot || !parkingSlot.isOccupied) return null;

        parkingSlot.clear();
        this._availableSlotsHeap.insert(parkingSlot.slotNumber); // Re-add to heap

        return parkingSlot;
    }

    public getAvailableSlots(): ParkingSlot[] {
        return this._slots.filter(s => !s.isOccupied);
    }

    public getAvailableSlot(): ParkingSlot | null {
        const minSlotNumber = this._availableSlotsHeap.peek();
        return minSlotNumber != null ? this.getSlotByNumber(minSlotNumber) : null;
    }

    public getOccupiedSlots(): ParkingSlot[] {
        return this._slots.filter(s => s.isOccupied);
    }

    public getSlotByRegNo(regNo: string): ParkingSlot | null {
        return this._slots.find(s => s.vehicle?.registrationNumber === regNo) ?? null;
    }

    public getSlotsByColor(color: Color): ParkingSlot[] | null {
        const slots =  this._slots.filter(s => s.vehicle?.color === color);

        if(!slots || slots.length === 0) return null;

        return slots;
    }

    public getVehiclesByColor(color: Color): Vehicle[] | null {
        const vehicles =  this._slots
            .filter(s => s.vehicle?.color === color)
            .map(s => s.vehicle!);

        if(!vehicles || vehicles.length === 0) return null;

        return vehicles;
    }
}
