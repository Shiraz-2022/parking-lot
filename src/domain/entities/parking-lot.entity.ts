import { ParkingSlot } from './parking-slot.entity';
import { Vehicle } from './vehicle.entity';
import type { Color } from "../enums/color.enum.ts";
import { MinHeap } from '../shared/min-heap';
import { Type, Expose } from "class-transformer";

export class ParkingLot {
    @Expose()
    _id?: string;

    @Expose()
    @Type(() => ParkingSlot)
    private _slots: ParkingSlot[] = [];
    
    @Expose()
    private _availableSlotsHeap: MinHeap;
    
    @Expose()
    private capacity: number;

    private _vehiclesByRegNo: Map<string, Vehicle> = new Map();
    private _vehiclesByColor: Map<Color, Set<Vehicle>> = new Map();

    constructor(capacity?: number) {
        this.capacity = capacity || 0;
        this._availableSlotsHeap = new MinHeap();
        if (capacity) {
            this._initializeSlots(capacity);
        }
    }

    private _initializeSlots(capacity: number) {
        for (let i = 1; i <= capacity; i++) {
            this._slots.push(new ParkingSlot(i));
            this._availableSlotsHeap.insert(i);
        }
    }

    public getTotalSlots(): number {
        return this.capacity;
    }

    public getAllSlots() {
        return this._slots;
    }

    public getSlotByNumber(slotNumber: number): ParkingSlot | null {
        if (slotNumber < 1 || slotNumber > this.capacity) {
            return null;
        }
        return this._slots[slotNumber - 1] || null;
    }

    public expand(additionalSlots: number) {
        this.capacity = this.capacity + additionalSlots;
        const currentSize = this._slots.length;
        for (let i = 1; i <= additionalSlots; i++) {
            const newSlotNumber = currentSize + i;
            this._slots.push(new ParkingSlot(newSlotNumber));
            this._availableSlotsHeap.insert(newSlotNumber);
        }
    }

    public park(vehicle: Vehicle, nextAvailableSlot: ParkingSlot): ParkingSlot | null {
        if (!vehicle.registrationNumber || !vehicle.color) {
            throw new Error("Vehicle registration number and color are required");
        }

        nextAvailableSlot.park(vehicle);
        this._slots[nextAvailableSlot.slotNumber - 1] = nextAvailableSlot;
        this._availableSlotsHeap.extractMin();

        // Update vehicle maps
        this.updateVehicleMaps(vehicle, nextAvailableSlot);

        return nextAvailableSlot;
    }

    public updateVehicleMaps(vehicle: Vehicle, slot: ParkingSlot): void {
        // Update registration number map
        this._vehiclesByRegNo.set(vehicle.registrationNumber, vehicle);

        // Update color map
        if (!this._vehiclesByColor.has(vehicle.color)) {
            this._vehiclesByColor.set(vehicle.color, new Set());
        }
        this._vehiclesByColor.get(vehicle.color)!.add(vehicle);
    }

    public leaveBySlot(slot: ParkingSlot): ParkingSlot {
        const parkingSlot = this._slots[slot.slotNumber - 1];
        if (!parkingSlot || !parkingSlot.isOccupied) {
            throw new Error("Parking slot is already empty");
        }

        const vehicle = parkingSlot.vehicle!;
        parkingSlot.clear();
        this._slots[parkingSlot.slotNumber - 1] = parkingSlot;
        this._availableSlotsHeap.insert(parkingSlot.slotNumber);

        // Update vehicle maps
        this._vehiclesByRegNo.delete(vehicle.registrationNumber);
        const colorVehicles = this._vehiclesByColor.get(vehicle.color);
        if (colorVehicles) {
            colorVehicles.delete(vehicle);
            if (colorVehicles.size === 0) {
                this._vehiclesByColor.delete(vehicle.color);
            }
        }

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
        const vehicle = this._vehiclesByRegNo.get(regNo);
        if (!vehicle) return null;
        return this._slots.find(s => s.vehicle === vehicle) ?? null;
    }

    public getSlotsByColor(color: Color): ParkingSlot[] | null {
        const vehicles = this._vehiclesByColor.get(color);
        if (!vehicles || vehicles.size === 0) return null;
        return this._slots.filter(s => vehicles.has(s.vehicle!));
    }

    public getVehiclesByColor(color: Color): Vehicle[] | null {
        const vehicles = this._vehiclesByColor.get(color);
        return vehicles ? Array.from(vehicles) : null;
    }
}
