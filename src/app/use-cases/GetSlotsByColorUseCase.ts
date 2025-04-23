import type { ParkingLotRepository } from "../../domain/repositories/parking-lot/parking-lot.repository.ts";
import type {Color} from "../../domain/enums/color.enum.ts";
import type {ParkingSlot} from "../../domain/entities/parking-slot.entity.ts";
import {GetSlotsByColorDto} from "../dto/GetSlotsByColorDto";

export class GetSlotsByColorUseCase {
    constructor(private readonly parkingLotRepository: ParkingLotRepository) {}

    async execute(request: GetSlotsByColorDto): Promise<ParkingSlot[] | null> {
        const parkingLot = this.parkingLotRepository.findById(request.parkingLotId, true);

        return parkingLot!.getSlotsByColor(request.color);
    }
}
