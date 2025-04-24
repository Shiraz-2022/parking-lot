import { AllocateParkingSlotUseCase } from '../../../src/app/use-cases/AllocateParkingSlotUseCase';
import { ParkingLot } from '../../../src/domain/entities/parking-lot.entity';
import { ParkingSlot } from '../../../src/domain/entities/parking-slot.entity';
import { Color } from '../../../src/domain/enums/color.enum';
import { AllocateParkingSlotDto } from '../../../src/app/dto/AllocateParkingSlotDto';

describe('AllocateParkingSlotUseCase', () => {
    let useCase: AllocateParkingSlotUseCase;
    let mockRepository: any;

    beforeEach(() => {
        // Create a mock repository
        mockRepository = {
            findById: jest.fn(),
            update: jest.fn(),
            removeFromHeap: jest.fn(),
        };

        useCase = new AllocateParkingSlotUseCase(mockRepository);
    });

    it('should allocate a parking slot for a vehicle', async () => {
        // Arrange
        const parkingLotId = 'test-parking-lot';
        const dto: AllocateParkingSlotDto = {
            regNo: 'KA-01-HH-1234',
            color: Color.WHITE,
            parkingLotId,
        };

        // Create a parking lot with available slots
        const parkingLot = new ParkingLot(3);
        mockRepository.findById.mockReturnValue(parkingLot);
        mockRepository.update.mockReturnValue(parkingLot);

        // Act
        const result = await useCase.execute(dto);

        // Assert
        expect(result).toBeDefined();
        expect(result?.vehicle?.registrationNumber).toBe('KA-01-HH-1234');
        expect(result?.vehicle?.color).toBe(Color.WHITE);
        expect(mockRepository.findById).toHaveBeenCalledWith(parkingLotId, true);
        expect(mockRepository.update).toHaveBeenCalledWith(parkingLotId, expect.any(ParkingLot));
    });

    it('should return null when no slots are available', async () => {
        // Arrange
        const parkingLotId = 'test-parking-lot';
        const dto: AllocateParkingSlotDto = {
            regNo: 'KA-01-HH-1234',
            color: Color.WHITE,
            parkingLotId,
        };

        // Create a full parking lot
        const parkingLot = new ParkingLot(1);
        const availableSlot = parkingLot.getAvailableSlot();
        if (availableSlot) {
            parkingLot.park({ registrationNumber: 'KA-01-HH-5678', color: Color.BLACK } as any, availableSlot);
        }
        
        mockRepository.findById.mockReturnValue(parkingLot);

        // Act
        const result = await useCase.execute(dto);
        expect(result).toBeNull();
        expect(mockRepository.findById).toHaveBeenCalledWith(parkingLotId, true);
        expect(mockRepository.update).not.toHaveBeenCalled();
    });
}); 