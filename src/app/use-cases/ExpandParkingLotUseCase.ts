import type {ParkingLotRepository} from "../../domain/repositories/parking-lot/parking-lot.repository.ts";
import type {ExpandParkingLotDto} from "../dto/ExpandParkingLotDto.ts";
import {ParkingLot} from "../../domain/entities/parking-lot.entity";


export class ExpandParkingLotUseCase {
    constructor(private parkingLotRepository: ParkingLotRepository) {}

    async execute(request: ExpandParkingLotDto): Promise<ParkingLot | null> {
        if (request.slotsCount<= 0) {
            throw new Error("Number of slots to add should be greater than zero");
        }

        const parkingLot = this.parkingLotRepository.findById(request.parkingLotId,true);

        // parkingLot!.expand(request.slotsCount);

        return this.parkingLotRepository.update(request.parkingLotId, parkingLot!);
    }
}