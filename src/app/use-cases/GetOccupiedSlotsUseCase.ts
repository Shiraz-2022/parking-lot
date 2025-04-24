import type { ParkingLotRepository } from "../../domain/repositories/parking-lot/parking-lot.repository.ts";
import type {ParkingSlot} from "../../domain/entities/parking-slot.entity.ts";
import {GetOccupiedSlotsDto} from "../dto/GetOccupiedSlotsDto";
import {ParkingLotMapper} from "../mapper/parking-lot.mapper";

export class GetOccupiedSlotsUseCase {
    constructor(private readonly parkingLotRepository: ParkingLotRepository) {}

    async execute(request: GetOccupiedSlotsDto): Promise<ParkingSlot[]> {
        const raw = this.parkingLotRepository.findById(request.parkingLotId, true);

        console.log("raw", raw);

        const parkingLot = ParkingLotMapper.toEntity(raw);

        console.log("parkingLot", parkingLot);

        return parkingLot!.getOccupiedSlots();
    }
}
