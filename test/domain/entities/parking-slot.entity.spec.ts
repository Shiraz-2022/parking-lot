import { ParkingSlot } from '../../../src/domain/entities/parking-slot.entity';
import { Car } from '../../../src/domain/entities/car.entity';
import { Color } from '../../../src/domain/enums/color.enum';

describe('ParkingSlot', () => {
    let parkingSlot: ParkingSlot;
    const SLOT_NUMBER = 1;

    beforeEach(() => {
        parkingSlot = new ParkingSlot(SLOT_NUMBER);
    });

    describe('initialization', () => {
        it('should initialize with correct slot number', () => {
            expect(parkingSlot.slotNumber).toBe(SLOT_NUMBER);
        });

        it('should initialize as unoccupied', () => {
            expect(parkingSlot.isOccupied).toBeFalsy();
            expect(parkingSlot.vehicle).toBeNull();
        });

        it('should throw error when slot number is negative', () => {
            expect(() => new ParkingSlot(-1)).toThrow('Slot number must be greater than or equal 0');
        });
    });

    describe('parking operations', () => {
        it('should park a vehicle successfully', () => {
            const car = new Car('KA-01-HH-1234', Color.WHITE);
            parkingSlot.park(car);

            expect(parkingSlot.isOccupied).toBeTruthy();
            expect(parkingSlot.vehicle).toBeDefined();
            expect(parkingSlot.vehicle!.registrationNumber).toBe('KA-01-HH-1234');
        });

        it('should throw error when trying to park in an occupied slot', () => {
            const car1 = new Car('KA-01-HH-1234', Color.WHITE);
            const car2 = new Car('KA-01-HH-5678', Color.BLACK);

            parkingSlot.park(car1);
            expect(() => parkingSlot.park(car2)).toThrow(`Slot ${SLOT_NUMBER} is already occupied`);
        });
    });

    describe('clearing operations', () => {
        it('should clear an occupied slot successfully', () => {
            const car = new Car('KA-01-HH-1234', Color.WHITE);
            parkingSlot.park(car);
            parkingSlot.clear();

            expect(parkingSlot.isOccupied).toBeFalsy();
            expect(parkingSlot.vehicle).toBeNull();
        });

        it('should throw error when trying to clear an empty slot', () => {
            expect(() => parkingSlot.clear()).toThrow(`Slot ${SLOT_NUMBER} is already empty`);
        });
    });
}); 