import { Vehicle } from './vehicle.entity';
import {Type} from "class-transformer";

export class Car extends Vehicle {
    get type(): string {
        return 'car';
    }
}
