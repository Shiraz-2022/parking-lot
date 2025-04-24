import { GetSlotByVehicleUseCase } from '../../../src/app/use-cases/GetSlotByVehicleUseCase';
import { ParkingLot } from '../../../src/domain/entities/parking-lot.entity';
import { Car } from '../../../src/domain/entities/car.entity';
import { Color } from '../../../src/domain/enums/color.enum';
import { GetSlotByVehicleDto } from '../../../src/app/dto/GetSlotByVehicleDto';
import { ParkingLotRepository } from '../../../src/domain/repositories/parking-lot/parking-lot.repository';

describe('GetSlotByVehicleUseCase', () => {
    let useCase: GetSlotByVehicleUseCase;
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

        useCase = new GetSlotByVehicleUseCase(mockRepository);
    });

    it('should find slot by vehicle registration number', async () => {
        // Arrange
        const parkingLotId = 'test-parking-lot';
        const dto: GetSlotByVehicleDto = {
            regNo: 'KA-01-HH-1234',
            parkingLotId,
        };

        // Create a parking lot with a vehicle
        const parkingLot = new ParkingLot(3);
        const car = new Car('KA-01-HH-1234', Color.WHITE);
        const slot = parkingLot.getAvailableSlot();
        if (slot) {
            parkingLot.park(car, slot);
        }
        
        mockRepository.findById.mockReturnValue(parkingLot);

        // Act
        const result = await useCase.execute(dto);

        // Assert
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result!.vehicle!.registrationNumber).toBe('KA-01-HH-1234');
        expect(mockRepository.findById).toHaveBeenCalledWith(parkingLotId, true);
    });

    it('should return null when vehicle is not found', async () => {
        // Arrange
        const parkingLotId = 'test-parking-lot';
        const dto: GetSlotByVehicleDto = {
            regNo: 'NON-EXISTENT',
            parkingLotId,
        };

        // Create an empty parking lot
        const parkingLot = new ParkingLot(3);
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
        const dto: GetSlotByVehicleDto = {
            regNo: 'KA-01-HH-1234',
            parkingLotId,
        };

        // Create an empty parking lot
        const parkingLot = new ParkingLot(3);
        mockRepository.findById.mockReturnValue(parkingLot);

        // Act
        const result = await useCase.execute(dto);

        // Assert
        expect(result).toBeNull();
        expect(mockRepository.findById).toHaveBeenCalledWith(parkingLotId, true);
    });
}); 