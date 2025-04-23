import type { ParkingLotRepository } from "../../domain/repositories/parking-lot/parking-lot.repository.ts";
import type {ParkingSlot} from "../../domain/entities/parking-slot.entity.ts";
import {GetOccupiedSlotsDto} from "../dto/GetOccupiedSlotsDto";

export class GetOccupiedSlotsUseCase {
    constructor(private readonly parkingLotRepository: ParkingLotRepository) {}

    async execute(request: GetOccupiedSlotsDto): Promise<ParkingSlot[]> {
        const parkingLot = this.parkingLotRepository.findById(request.parkingLotId, true);

        return parkingLot!.getOccupiedSlots();
    }
}
