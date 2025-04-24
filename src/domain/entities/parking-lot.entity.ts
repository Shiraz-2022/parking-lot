import { ParkingSlot } from './parking-slot.entity';
import { Vehicle } from './vehicle.entity';
import type { Color } from "../enums/color.enum.ts";
import { MinHeap } from '../shared/min-heap';
import {Type} from "class-transformer";

export class ParkingLot {
    @Type(()=> ParkingSlot)
    private _slots: ParkingSlot[] = [];
    private _availableSlotsHeap: MinHeap;

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
        console.log("getSlotByNumber", this._slots);
        console.log("getSlotByNumber", slotNumber);
        const slot = this._slots[slotNumber];
        return slot ?? null;
    }

    public expand(additionalSlots: number) {
        this.capacity = this.capacity+additionalSlots;
        const currentSize = this._slots.length;
        for (let i = 1; i <= additionalSlots; i++) {
            const newSlotNumber = currentSize + i;
            this._slots.push(new ParkingSlot(newSlotNumber));
            this._availableSlotsHeap.insert(newSlotNumber); // Add to heap
        }
    }

    public park(vehicle: Vehicle, nextAvailableSlot): ParkingSlot | null {
        if (!vehicle.registrationNumber || !vehicle.color) {
            throw new Error("Vehicle registration number and color are required");
        }

        nextAvailableSlot.park(vehicle);

        this._slots[nextAvailableSlot.slotNumber] = nextAvailableSlot;

        return nextAvailableSlot;
    }

    public leaveBySlot(slot: ParkingSlot): ParkingSlot {
        const parkingSlot = this._slots[slot.slotNumber];
        if (!parkingSlot || !parkingSlot.isOccupied) {
            throw new Error("Parking slot is already empty");
        }

        parkingSlot.clear();

        this._slots[parkingSlot.slotNumber] = parkingSlot;

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
        console.log("Occupied Slots:", this._slots);
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
