import { Vehicle } from './vehicle.entity';

export class Car extends Vehicle  {
    get type(): string {
        return 'car';
    }
}
