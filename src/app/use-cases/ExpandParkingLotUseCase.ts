import type {ParkingLotRepository} from "../../domain/repositories/parking-lot/parking-lot.repository.ts";
import type {ExpandParkingLotDto} from "../dto/ExpandParkingLotDto.ts";
import {ParkingLot} from "../../domain/entities/parking-lot.entity";
import {ParkingLotMapper} from "../mapper/parking-lot.mapper";


export class ExpandParkingLotUseCase {
    constructor(private parkingLotRepository: ParkingLotRepository) {}

    async execute(request: ExpandParkingLotDto): Promise<ParkingLot | null> {
        if (request.slotsCount<= 0) {
            throw new Error("Number of slots to add should be greater than zero");
        }

        const raw = this.parkingLotRepository.findById(request.parkingLotId,true);
        const parkingLot = ParkingLotMapper.toEntity(raw);

        parkingLot.expand(request.slotsCount);

        return this.parkingLotRepository.updateParkingLot(request.parkingLotId, parkingLot, request.slotsCount);
    }
}