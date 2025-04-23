import type {ParkingLotRepository} from "../../domain/repositories/parking-lot/parking-lot.repository.ts";
import type {ParkingSlot} from "../../domain/entities/parking-slot.entity.ts";
import {GetSlotByVehicleDto} from "../dto/GetSlotByVehicleDto";

export class GetSlotByVehicleUseCase {
    constructor(private parkingLotRepository: ParkingLotRepository) {}

    async execute(request: GetSlotByVehicleDto): Promise<ParkingSlot | null> {
        const parkingLot = this.parkingLotRepository.findById(request.parkingLotId, true)
        return parkingLot!.getSlotByRegNo(request.regNo);
    }
}
