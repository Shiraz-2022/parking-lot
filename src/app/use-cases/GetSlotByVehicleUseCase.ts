import type {ParkingLotRepository} from "../../domain/repositories/parking-lot/parking-lot.repository.ts";
import type {ParkingSlot} from "../../domain/entities/parking-slot.entity.ts";
import {GetSlotByVehicleDto} from "../dto/GetSlotByVehicleDto";
import {ParkingLotMapper} from "../mapper/parking-lot.mapper";

export class GetSlotByVehicleUseCase {
    constructor(private parkingLotRepository: ParkingLotRepository) {}

    async execute(request: GetSlotByVehicleDto): Promise<ParkingSlot | null> {
        const raw = this.parkingLotRepository.findById(request.parkingLotId, true)
        const parkingLot = ParkingLotMapper.toEntity(raw);

        return parkingLot.getSlotByRegNo(request.regNo);
    }
}
