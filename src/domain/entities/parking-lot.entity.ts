/**
 * Represents a parking lot with multiple parking slots
 * Manages vehicle parking, slot allocation and queries
 */
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

    /**
     * Creates a new parking lot with optional initial capacity
     */
    constructor(capacity?: number) {
        this.capacity = capacity || 0;
        this._availableSlotsHeap = new MinHeap();
        if (capacity) {
            this._initializeSlots(capacity);
        }
    }

    /**
     * Initializes parking slots with given capacity
     */
    private _initializeSlots(capacity: number) {
        for (let i = 1; i <= capacity; i++) {
            this._slots.push(new ParkingSlot(i));
            this._availableSlotsHeap.insert(i);
        }
    }

    /**
     * Returns total number of slots in the parking lot
     */
    public getTotalSlots(): number {
        return this.capacity;
    }

    /**
     * Returns all parking slots
     */
    public getAllSlots() {
        return this._slots;
    }

    /**
     * Gets a parking slot by its number
     */
    public getSlotByNumber(slotNumber: number): ParkingSlot | null {
        if (slotNumber < 1 || slotNumber > this.capacity) {
            return null;
        }
        return this._slots[slotNumber - 1] || null;
    }

    /**
     * Expands parking lot capacity by adding new slots
     */
    public expand(additionalSlots: number) {
        this.capacity = this.capacity + additionalSlots;
        const currentSize = this._slots.length;
        for (let i = 1; i <= additionalSlots; i++) {
            const newSlotNumber = currentSize + i;
            this._slots.push(new ParkingSlot(newSlotNumber));
            this._availableSlotsHeap.insert(newSlotNumber);
        }
    }

    /**
     * Parks a vehicle in the next available slot
     */
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

    /**
     * Updates internal maps tracking vehicles
     */
    public updateVehicleMaps(vehicle: Vehicle, slot: ParkingSlot): void {
        // Update registration number map
        this._vehiclesByRegNo.set(vehicle.registrationNumber, vehicle);

        // Update color map
        if (!this._vehiclesByColor.has(vehicle.color)) {
            this._vehiclesByColor.set(vehicle.color, new Set());
        }
        this._vehiclesByColor.get(vehicle.color)!.add(vehicle);
    }

    /**
     * Removes a vehicle from a parking slot
     */
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

    /**
     * Returns all available parking slots
     */
    public getAvailableSlots(): ParkingSlot[] {
        return this._slots.filter(s => !s.isOccupied);
    }

    /**
     * Returns the next available parking slot
     */
    public getAvailableSlot(): ParkingSlot | null {
        const minSlotNumber = this._availableSlotsHeap.peek();
        return minSlotNumber != null ? this.getSlotByNumber(minSlotNumber) : null;
    }

    /**
     * Returns all occupied parking slots
     */
    public getOccupiedSlots(): ParkingSlot[] {
        return this._slots.filter(s => s.isOccupied);
    }

    /**
     * Finds a parking slot by vehicle registration number
     */
    public getSlotByRegNo(regNo: string): ParkingSlot | null {
        const vehicle = this._vehiclesByRegNo.get(regNo);
        if (!vehicle) return null;
        return this._slots.find(s => s.vehicle === vehicle) ?? null;
    }

    /**
     * Gets all parking slots with vehicles of a specific color
     */
    public getSlotsByColor(color: Color): ParkingSlot[] | null {
        const vehicles = this._vehiclesByColor.get(color);
        if (!vehicles || vehicles.size === 0) return null;
        return this._slots.filter(s => vehicles.has(s.vehicle!));
    }

    /**
     * Gets all vehicles of a specific color
     */
    public getVehiclesByColor(color: Color): Vehicle[] | null {
        const vehicles = this._vehiclesByColor.get(color);
        return vehicles ? Array.from(vehicles) : null;
    }
}
