import { GetVehiclesByColorUseCase } from '../../../src/app/use-cases/GetVehiclesByColorUseCase';
import { ParkingLot } from '../../../src/domain/entities/parking-lot.entity';
import { Car } from '../../../src/domain/entities/car.entity';
import { Color } from '../../../src/domain/enums/color.enum';
import { GetVehiclesByColorDto } from '../../../src/app/dto/GetVehiclesByColorDto';
import { ParkingLotRepository } from '../../../src/domain/repositories/parking-lot/parking-lot.repository';

describe('GetVehiclesByColorUseCase', () => {
    let useCase: GetVehiclesByColorUseCase;
    let mockRepository: jest.Mocked<ParkingLotRepository>;

    beforeEach(() => {
        // Create a mock repository
        mockRepository = {
            createParkingLot: jest.fn(),
            updateParkingLot: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            addToHeap: jest.fn(),
            removeFromHeap: jest.fn(),
            peekMin: jest.fn(),
            collection: {
                map: new Map(),
                array: [],
                heap: {
                    insert: jest.fn(),
                    extractMin: jest.fn(),
                    peek: jest.fn(),
                },
            },
            generateId: jest.fn().mockReturnValue('test-id'),
        } as unknown as jest.Mocked<ParkingLotRepository>;

        useCase = new GetVehiclesByColorUseCase(mockRepository);
    });

    it('should return vehicles of the specified color', async () => {
        // Arrange
        const parkingLotId = 'test-parking-lot';
        const dto: GetVehiclesByColorDto = {
            color: Color.WHITE,
            parkingLotId,
        };

        // Create a parking lot with vehicles of different colors
        const parkingLot = new ParkingLot(3);
        
        // Park a white car
        const whiteCar = new Car('KA-01-HH-1234', Color.WHITE);
        const slot1 = parkingLot.getAvailableSlot();
        if (slot1) {
            parkingLot.park(whiteCar, slot1);
        }
        
        // Park a black car
        const blackCar = new Car('KA-01-HH-5678', Color.BLACK);
        const slot2 = parkingLot.getAvailableSlot();
        if (slot2) {
            parkingLot.park(blackCar, slot2);
        }
        
        // Park another white car
        const whiteCar2 = new Car('KA-01-HH-9999', Color.WHITE);
        const slot3 = parkingLot.getAvailableSlot();
        if (slot3) {
            parkingLot.park(whiteCar2, slot3);
        }
        
        mockRepository.findById.mockReturnValue(parkingLot);

        // Act
        const result = await useCase.execute(dto);

        // Assert
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result!.length).toBe(2);
        expect(result!.every(v => v.color === Color.WHITE)).toBeTruthy();
        expect(mockRepository.findById).toHaveBeenCalledWith(parkingLotId, true);
    });

    it('should return null when no vehicles of the specified color are found', async () => {
        // Arrange
        const parkingLotId = 'test-parking-lot';
        const dto: GetVehiclesByColorDto = {
            color: Color.WHITE,
            parkingLotId,
        };

        // Create a parking lot with only black cars
        const parkingLot = new ParkingLot(2);
        
        // Park two black cars
        const blackCar1 = new Car('KA-01-HH-1234', Color.BLACK);
        const slot1 = parkingLot.getAvailableSlot();
        if (slot1) {
            parkingLot.park(blackCar1, slot1);
        }
        
        const blackCar2 = new Car('KA-01-HH-5678', Color.BLACK);
        const slot2 = parkingLot.getAvailableSlot();
        if (slot2) {
            parkingLot.park(blackCar2, slot2);
        }
        
        mockRepository.findById.mockReturnValue(parkingLot);

        // Act
        const result = await useCase.execute(dto);

        // Assert
        expect(result).toBeNull();
        expect(mockRepository.findById).toHaveBeenCalledWith(parkingLotId, true);
    });

    it('should return null when parking lot is empty', async () => {
        // Arrange
        const parkingLotId = 'test-parking-lot';
        const dto: GetVehiclesByColorDto = {
            color: Color.WHITE,
            parkingLotId,
        };

        // Create an empty parking lot
        const parkingLot = new ParkingLot(2);
        mockRepository.findById.mockReturnValue(parkingLot);

        // Act
        const result = await useCase.execute(dto);

        // Assert
        expect(result).toBeNull();
        expect(mockRepository.findById).toHaveBeenCalledWith(parkingLotId, true);
    });
}); 