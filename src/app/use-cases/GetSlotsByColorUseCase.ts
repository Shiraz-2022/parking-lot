import type { ParkingLotRepository } from "../../domain/repositories/parking-lot/parking-lot.repository.ts";
import type {Color} from "../../domain/enums/color.enum.ts";
import type {ParkingSlot} from "../../domain/entities/parking-slot.entity.ts";
import {GetSlotsByColorDto} from "../dto/GetSlotsByColorDto";
import {ParkingLotMapper} from "../mapper/parking-lot.mapper";

export class GetSlotsByColorUseCase {
    constructor(private readonly parkingLotRepository: ParkingLotRepository) {}

    async execute(request: GetSlotsByColorDto): Promise<ParkingSlot[] | null> {
        const raw = this.parkingLotRepository.findById(request.parkingLotId, true);
        const parkingLot = ParkingLotMapper.toEntity(raw);

        return parkingLot!.getSlotsByColor(request.color);
    }
}
