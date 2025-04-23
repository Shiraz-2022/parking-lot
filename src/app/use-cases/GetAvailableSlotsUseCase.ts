import type { ParkingLotRepository } from "../../domain/repositories/parking-lot/parking-lot.repository.ts";
import type {ParkingSlot} from "../../domain/entities/parking-slot.entity.ts";

export class GetAvailableSlotsUseCase {
    constructor(private readonly parkingLotRepository: ParkingLotRepository) {}

    async execute(parkingLotId: string): Promise<ParkingSlot[] | null> {
        const parkingLot = this.parkingLotRepository.findById(parkingLotId, true)
        return parkingLot!.getAvailableSlots();
    }
}
