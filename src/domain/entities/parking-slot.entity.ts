import { Vehicle } from './vehicle.entity';
import { Type, Expose } from 'class-transformer';

export class ParkingSlot {
    @Expose()
    public readonly slotNumber: number;
    
    @Expose()
    @Type(() => Vehicle)
    private _vehicle: Vehicle | null = null;

    constructor(slotNumber: number, vehicle: Vehicle | null = null) {
        if (slotNumber < 0) {
            throw new Error('Slot number must be greater than or equal 0');
        }
        this.slotNumber = slotNumber;
        this._vehicle = vehicle;
    }

    public get isOccupied(): boolean {
        return this._vehicle !== null;
    }

    public get vehicle(): Vehicle | null {
        return this._vehicle;
    }

    public park(vehicle: Vehicle): void {
        if (this._vehicle) throw new Error(`Slot ${this.slotNumber} is already occupied`);
        this._vehicle = vehicle;
    }

    public clear(): void {
        if (!this._vehicle) throw new Error(`Slot ${this.slotNumber} is already empty`);
        this._vehicle = null;
    }
}
