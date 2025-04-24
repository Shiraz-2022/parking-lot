import { ParkingLot } from '../../../src/domain/entities/parking-lot.entity';
import { Car } from '../../../src/domain/entities/car.entity';
import { ParkingSlot } from '../../../src/domain/entities/parking-slot.entity';
import { Color } from '../../../src/domain/enums/color.enum';

describe('ParkingLot', () => {
    let parkingLot: ParkingLot;
    const CAPACITY = 3;

    beforeEach(() => {
        parkingLot = new ParkingLot(CAPACITY);
    });

    describe('initialization', () => {
        it('should initialize with correct capacity', () => {
            expect(parkingLot.getTotalSlots()).toBe(CAPACITY);
        });

        it('should initialize all slots as available', () => {
            const availableSlots = parkingLot.getAvailableSlots();
            expect(availableSlots.length).toBe(CAPACITY);
        });
    });

    describe('parking operations', () => {
        it('should park a vehicle in the first available slot', () => {
            const car = new Car('KA-01-HH-1234', Color.WHITE);
            const availableSlot = parkingLot.getAvailableSlot();
            const parkedSlot = parkingLot.park(car, availableSlot!);

            expect(parkedSlot).toBeDefined();
            expect(parkedSlot!.vehicle).toBeDefined();
            expect(parkedSlot!.vehicle!.registrationNumber).toBe('KA-01-HH-1234');
        });

        it('should throw error when trying to park without registration number', () => {
            expect(() => new Car('', Color.WHITE)).toThrow('Vehicle registration number and color are required');
        });

        it('should not allow parking when lot is full', () => {
            // Park three cars
            for (let i = 0; i < CAPACITY; i++) {
                const car = new Car(`KA-01-HH-${i}`, Color.WHITE);
                const availableSlot = parkingLot.getAvailableSlot();
                parkingLot.park(car, availableSlot!);
            }

            expect(parkingLot.getAvailableSlot()).toBeNull();
        });
    });

    describe('leaving operations', () => {
        it('should allow a vehicle to leave', () => {
            const car = new Car('KA-01-HH-1234', Color.WHITE);
            const availableSlot = parkingLot.getAvailableSlot();
            const parkedSlot = parkingLot.park(car, availableSlot!);

            const clearedSlot = parkingLot.leaveBySlot(parkedSlot!);
            expect(clearedSlot.isOccupied).toBeFalsy();
            expect(clearedSlot.vehicle).toBeNull();
        });

        it('should throw error when trying to leave an empty slot', () => {
            const emptySlot = new ParkingSlot(1);
            expect(() => parkingLot.leaveBySlot(emptySlot)).toThrow('Parking slot is already empty');
        });
    });

    describe('query operations', () => {
        beforeEach(() => {
            // Create a fresh parking lot for each test
            parkingLot = new ParkingLot(CAPACITY);
            
            // Park two white cars and one black car
            const whiteCar1 = new Car('KA-01-HH-1234', Color.WHITE);
            const whiteCar2 = new Car('KA-01-HH-5678', Color.WHITE);
            const blackCar = new Car('KA-01-HH-9999', Color.BLACK);

            const slot1 = parkingLot.getAvailableSlot();
            parkingLot.park(whiteCar1, slot1!);

            const slot2 = parkingLot.getAvailableSlot();
            parkingLot.park(whiteCar2, slot2!);

            const slot3 = parkingLot.getAvailableSlot();
            parkingLot.park(blackCar, slot3!);
        });

        it('should find slot by registration number', () => {
            const slot = parkingLot.getSlotByRegNo('KA-01-HH-1234');
            expect(slot).toBeDefined();
            expect(slot!.vehicle!.registrationNumber).toBe('KA-01-HH-1234');
        });

        it('should return null when searching for non-existent registration number', () => {
            const slot = parkingLot.getSlotByRegNo('NON-EXISTENT');
            expect(slot).toBeNull();
        });

        it('should find slots by color', () => {
            const whiteSlots = parkingLot.getSlotsByColor(Color.WHITE);
            expect(whiteSlots).toBeDefined();
            expect(whiteSlots!.length).toBe(2);
            expect(whiteSlots!.every(s => s.vehicle!.color === Color.WHITE)).toBeTruthy();
        });

        it('should return null when searching for non-existent color', () => {
            const slots = parkingLot.getSlotsByColor(Color.RED);
            expect(slots).toBeNull();
        });

        it('should find vehicles by color', () => {
            const whiteVehicles = parkingLot.getVehiclesByColor(Color.WHITE);
            expect(whiteVehicles).toBeDefined();
            expect(whiteVehicles!.length).toBe(2);
            expect(whiteVehicles!.every(v => v.color === Color.WHITE)).toBeTruthy();
        });

        it('should return null when searching for vehicles of non-existent color', () => {
            const vehicles = parkingLot.getVehiclesByColor(Color.RED);
            expect(vehicles).toBeNull();
        });

        it('should update vehicle maps when a vehicle leaves', () => {
            const slot = parkingLot.getSlotByRegNo('KA-01-HH-1234');
            expect(slot).toBeDefined();
            
            parkingLot.leaveBySlot(slot!);
            
            expect(parkingLot.getSlotByRegNo('KA-01-HH-1234')).toBeNull();
            const whiteVehicles = parkingLot.getVehiclesByColor(Color.WHITE);
            expect(whiteVehicles!.length).toBe(1);
        });
    });

    describe('expansion', () => {
        it('should expand parking lot capacity', () => {
            const additionalSlots = 2;
            parkingLot.expand(additionalSlots);
            expect(parkingLot.getTotalSlots()).toBe(CAPACITY + additionalSlots);
        });
    });
}); 