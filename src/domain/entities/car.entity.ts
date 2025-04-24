/**
 * Represents a car vehicle type
 */
import { Vehicle } from './vehicle.entity';
import { Expose } from "class-transformer";

export class Car extends Vehicle {
    @Expose()
    /**
     * Returns the vehicle type as 'car'
     */
    get type(): string {
        return 'car';
    }
}
