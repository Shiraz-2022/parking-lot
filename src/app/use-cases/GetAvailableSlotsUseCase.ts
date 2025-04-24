import type { ParkingLotRepository } from "../../domain/repositories/parking-lot/parking-lot.repository.ts";
import type {ParkingSlot} from "../../domain/entities/parking-slot.entity.ts";
import {ParkingLotMapper} from "../mapper/parking-lot.mapper";

export class GetAvailableSlotsUseCase {
    constructor(private readonly parkingLotRepository: ParkingLotRepository) {}

    async execute(parkingLotId: string): Promise<ParkingSlot[] | null> {
        const raw = this.parkingLotRepository.findById(parkingLotId, true);
        const parkingLot = ParkingLotMapper.toEntity(raw);
        return parkingLot.getAvailableSlots();
    }
}
