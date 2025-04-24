import type { ParkingLotRepository } from "../../domain/repositories/parking-lot/parking-lot.repository.ts";
import type {Color} from "../../domain/enums/color.enum.ts";
import type {Vehicle} from "../../domain/entities/vehicle.entity.ts";
import {GetVehiclesByColorDto} from "../dto/GetVehiclesByColorDto";
import {ParkingLotMapper} from "../mapper/parking-lot.mapper";

export class GetVehiclesByColorUseCase {
    constructor(private readonly parkingLotRepository: ParkingLotRepository) {}

    async execute(request: GetVehiclesByColorDto): Promise<Vehicle[] | null> {
        const raw = this.parkingLotRepository.findById(request.parkingLotId, true);
        const parkingLot = ParkingLotMapper.toEntity(raw);

        return parkingLot!.getVehiclesByColor(request.color);
    }
}
