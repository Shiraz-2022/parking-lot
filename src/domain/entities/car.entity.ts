import { Vehicle } from './vehicle.entity';
import { Expose } from "class-transformer";

export class Car extends Vehicle {
    @Expose()
    get type(): string {
        return 'car';
    }
}
