import { Vehicle } from './vehicle.entity';
import { Type } from 'class-transformer';

export class ParkingSlot {

    constructor(
        public readonly slotNumber: number,
        private _vehicle: Vehicle | null = null,
    ) {
        if (slotNumber < 0) {
            throw new Error('Slot number must be greater than or equal 0');
        }
    }

    public get isOccupied(): boolean {
        return this._vehicle !== null;
    }

    @Type(() => Vehicle)
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
