import { Car } from '../../../src/domain/entities/car.entity';
import { Color } from '../../../src/domain/enums/color.enum';

describe('Car', () => {
    describe('initialization', () => {
        it('should initialize with valid registration number and color', () => {
            const car = new Car('KA-01-HH-1234', Color.WHITE);
            expect(car.registrationNumber).toBe('KA-01-HH-1234');
            expect(car.color).toBe(Color.WHITE);
        });

        it('should throw error when registration number is empty', () => {
            expect(() => new Car('', Color.WHITE))
                .toThrow('Vehicle registration number and color are required');
        });

        it('should throw error when color is not provided', () => {
            expect(() => new Car('KA-01-HH-1234', null as any))
                .toThrow('Vehicle registration number and color are required');
        });
    });

    describe('type property', () => {
        it('should return "car" as the vehicle type', () => {
            const car = new Car('KA-01-HH-1234', Color.WHITE);
            expect(car.type).toBe('car');
        });
    });
}); 