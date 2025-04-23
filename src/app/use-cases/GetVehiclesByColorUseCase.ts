import type { ParkingLotRepository } from "../../domain/repositories/parking-lot/parking-lot.repository.ts";
import type {Color} from "../../domain/enums/color.enum.ts";
import type {Vehicle} from "../../domain/entities/vehicle.entity.ts";
import {GetVehiclesByColorDto} from "../dto/GetVehiclesByColorDto";

export class GetVehiclesByColorUseCase {
    constructor(private readonly parkingLotRepository: ParkingLotRepository) {}

    async execute(request: GetVehiclesByColorDto): Promise<Vehicle[] | null> {
        const parkingLot = this.parkingLotRepository.findById(request.parkingLotId, true);

        return parkingLot!.getVehiclesByColor(request.color);
    }
}
