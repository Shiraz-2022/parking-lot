import { CreateParkingLotUseCase } from '../../../src/app/use-cases/CreateParkingLotUseCase';
import { ParkingLot } from '../../../src/domain/entities/parking-lot.entity';
import { ParkingLotRepository } from '../../../src/domain/repositories/parking-lot/parking-lot.repository';
import { CreateParkingLotDto } from '../../../src/app/dto/CreateParkingLotDto';

describe('CreateParkingLotUseCase', () => {
    let useCase: CreateParkingLotUseCase;
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

        useCase = new CreateParkingLotUseCase(mockRepository);
    });

    it('should create a parking lot with the specified capacity', async () => {
        // Arrange
        const dto: CreateParkingLotDto = { capacity: 5 };
        const expectedParkingLot = new ParkingLot(5);
        mockRepository.createParkingLot.mockReturnValue(expectedParkingLot);

        // Act
        const result = await useCase.execute(dto);

        // Assert
        expect(result).toBeDefined();
        expect(result.getTotalSlots()).toBe(5);
        expect(mockRepository.createParkingLot).toHaveBeenCalledTimes(1);
    });

    it('should pass the created parking lot to the repository', async () => {
        // Arrange
        const dto: CreateParkingLotDto = { capacity: 3 };
        const expectedParkingLot = new ParkingLot(3);
        mockRepository.createParkingLot.mockReturnValue(expectedParkingLot);

        // Act
        const result = await useCase.execute(dto);

        // Assert
        expect(mockRepository.createParkingLot).toHaveBeenCalledTimes(1);
        expect(result.getTotalSlots()).toBe(3);
    });
}); 