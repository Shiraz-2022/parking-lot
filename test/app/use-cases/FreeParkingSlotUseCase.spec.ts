import { FreeParkingSlotUseCase } from '../../../src/app/use-cases/FreeParkingSlotUseCase';
import { ParkingLot } from '../../../src/domain/entities/parking-lot.entity';
import { ParkingSlot } from '../../../src/domain/entities/parking-slot.entity';
import { Car } from '../../../src/domain/entities/car.entity';
import { Color } from '../../../src/domain/enums/color.enum';
import { FreeParkingSlotDto } from '../../../src/app/dto/FreeParkingSlotDto';
import { ParkingLotRepository } from '../../../src/domain/repositories/parking-lot/parking-lot.repository';

describe('FreeParkingSlotUseCase', () => {
    let useCase: FreeParkingSlotUseCase;
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

        useCase = new FreeParkingSlotUseCase(mockRepository);
    });

    it('should free a parking slot by slot number', async () => {
        // Arrange
        const parkingLotId = 'test-parking-lot';
        const dto: FreeParkingSlotDto = {
            slotNumber: 1,
            parkingLotId,
        };

        // Create a parking lot with an occupied slot
        const parkingLot = new ParkingLot(3);
        const availableSlot = parkingLot.getAvailableSlot();
        if (availableSlot) {
            parkingLot.park(new Car('KA-01-HH-1234', Color.WHITE), availableSlot);
        }
        
        mockRepository.findById.mockReturnValue(parkingLot);
        mockRepository.update.mockReturnValue(parkingLot);

        // Act
        const result = await useCase.execute(dto);

        // Assert
        expect(result).toBeDefined();
        expect(result.isOccupied).toBeFalsy();
        expect(result.vehicle).toBeNull();
        expect(mockRepository.findById).toHaveBeenCalledWith(parkingLotId, true);
        expect(mockRepository.update).toHaveBeenCalledWith(parkingLotId, expect.any(ParkingLot));
        expect(mockRepository.addToHeap).toHaveBeenCalledWith(expect.any(ParkingSlot));
    });

    it('should free a parking slot by registration number', async () => {
        // Arrange
        const parkingLotId = 'test-parking-lot';
        const dto: FreeParkingSlotDto = {
            regNo: 'KA-01-HH-1234',
            parkingLotId,
        };

        // Create a parking lot with an occupied slot
        const parkingLot = new ParkingLot(3);
        const availableSlot = parkingLot.getAvailableSlot();
        if (availableSlot) {
            parkingLot.park(new Car('KA-01-HH-1234', Color.WHITE), availableSlot);
        }
        
        mockRepository.findById.mockReturnValue(parkingLot);
        mockRepository.update.mockReturnValue(parkingLot);

        // Act
        const result = await useCase.execute(dto);

        // Assert
        expect(result).toBeDefined();
        expect(result.isOccupied).toBeFalsy();
        expect(result.vehicle).toBeNull();
        expect(mockRepository.findById).toHaveBeenCalledWith(parkingLotId, true);
        expect(mockRepository.update).toHaveBeenCalledWith(parkingLotId, expect.any(ParkingLot));
        expect(mockRepository.addToHeap).toHaveBeenCalledWith(expect.any(ParkingSlot));
    });

    it('should throw error when neither slot number nor registration number is provided', async () => {
        // Arrange
        const parkingLotId = 'test-parking-lot';
        const dto: FreeParkingSlotDto = {
            parkingLotId,
        };

        // Create a parking lot
        const parkingLot = new ParkingLot(3);
        mockRepository.findById.mockReturnValue(parkingLot);

        // Act & Assert
        await expect(useCase.execute(dto)).rejects.toThrow('Either slot number or vehicle registration number must be provided');
    });

    it('should throw error when slot number does not exist', async () => {
        // Arrange
        const parkingLotId = 'test-parking-lot';
        const dto: FreeParkingSlotDto = {
            slotNumber: 999,
            parkingLotId,
        };

        // Create a parking lot
        const parkingLot = new ParkingLot(3);
        mockRepository.findById.mockReturnValue(parkingLot);

        // Act & Assert
        await expect(useCase.execute(dto)).rejects.toThrow('Slot with number 999 does not exist');
    });

    it('should throw error when vehicle is not found', async () => {
        // Arrange
        const parkingLotId = 'test-parking-lot';
        const dto: FreeParkingSlotDto = {
            regNo: 'NON-EXISTENT',
            parkingLotId,
        };

        // Create a parking lot
        const parkingLot = new ParkingLot(3);
        mockRepository.findById.mockReturnValue(parkingLot);

        // Act & Assert
        await expect(useCase.execute(dto)).rejects.toThrow('No slot found for vehicle with registration number NON-EXISTENT');
    });
}); 