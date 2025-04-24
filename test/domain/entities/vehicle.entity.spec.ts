import { Vehicle } from '../../../src/domain/entities/vehicle.entity';
import { Color } from '../../../src/domain/enums/color.enum';

// Create a concrete implementation of Vehicle for testing
class TestVehicle extends Vehicle {
    get type(): string {
        return 'test';
    }
}

describe('Vehicle', () => {
    describe('initialization', () => {
        it('should initialize with valid registration number and color', () => {
            const vehicle = new TestVehicle('KA-01-HH-1234', Color.WHITE);
            expect(vehicle.registrationNumber).toBe('KA-01-HH-1234');
            expect(vehicle.color).toBe(Color.WHITE);
        });

        it('should throw error when registration number is empty', () => {
            expect(() => new TestVehicle('', Color.WHITE))
                .toThrow('Vehicle registration number and color are required');
        });

        it('should throw error when color is not provided', () => {
            expect(() => new TestVehicle('KA-01-HH-1234', null as any))
                .toThrow('Vehicle registration number and color are required');
        });
    });

    describe('type property', () => {
        it('should have a type property', () => {
            const vehicle = new TestVehicle('KA-01-HH-1234', Color.WHITE);
            expect(vehicle.type).toBe('test');
        });
    });
}); 