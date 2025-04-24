/**
 * Represents a single parking slot in a parking lot
 */
import { Vehicle } from './vehicle.entity';
import { Type, Expose } from 'class-transformer';

export class ParkingSlot {
    @Expose()
    public readonly slotNumber: number;
    
    @Expose()
    @Type(() => Vehicle)
    private _vehicle: Vehicle | null = null;

    /**
     * Creates a new parking slot with a slot number and optional vehicle
     */
    constructor(slotNumber: number, vehicle: Vehicle | null = null) {
        if (slotNumber < 0) {
            throw new Error('Slot number must be greater than or equal 0');
        }
        this.slotNumber = slotNumber;
        this._vehicle = vehicle;
    }

    /**
     * Checks if the slot is currently occupied
     */
    public get isOccupied(): boolean {
        return this._vehicle !== null;
    }

    /**
     * Gets the vehicle currently parked in this slot
     */
    public get vehicle(): Vehicle | null {
        return this._vehicle;
    }

    /**
     * Parks a vehicle in this slot
     */
    public park(vehicle: Vehicle): void {
        if (this._vehicle) throw new Error(`Slot ${this.slotNumber} is already occupied`);
        this._vehicle = vehicle;
    }

    /**
     * Removes the vehicle from this slot
     */
    public clear(): void {
        if (!this._vehicle) throw new Error(`Slot ${this.slotNumber} is already empty`);
        this._vehicle = null;
    }
}
