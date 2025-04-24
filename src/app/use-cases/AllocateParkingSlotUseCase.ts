import type { ParkingLotRepository } from "../../domain/repositories/parking-lot/parking-lot.repository";
import type { AllocateParkingSlotDto } from "../dto/AllocateParkingSlotDto";
import { Car } from "../../domain/entities/car.entity";
import type { ParkingSlot } from "../../domain/entities/parking-slot.entity";
import { ParkingLotMapper } from "../mapper/parking-lot.mapper";

/**
 * Use case for allocating a parking slot to a car in a parking lot
 */
export class AllocateParkingSlotUseCase {
    /**
     * Creates an instance of AllocateParkingSlotUseCase
     */
    constructor(private parkingLotRepository: ParkingLotRepository) {}

    /**
     * Executes the parking slot allocation process
     */
    async execute(request: AllocateParkingSlotDto): Promise<ParkingSlot | null> {
        const raw = this.parkingLotRepository.findById(request.parkingLotId, true);
        const parkingLot = ParkingLotMapper.toEntity(raw);

        const car = new Car(request.regNo, request.color);
        const nextAvailableSlot = parkingLot.getAvailableSlot();

        if (nextAvailableSlot == null) return null;

        const slot = parkingLot.park(car, nextAvailableSlot);

        this.parkingLotRepository.removeFromHeap();
        this.parkingLotRepository.update(request.parkingLotId, parkingLot);

        return slot;
    }
}