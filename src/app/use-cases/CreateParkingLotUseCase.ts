import { ParkingLot } from '../../domain/entities/parking-lot.entity';
import { ParkingLotRepository } from "../../domain/repositories/parking-lot/parking-lot.repository";
import {CreateParkingLotDto} from "../dto/CreateParkingLotDto";
import {ParkingLotMapper} from "../mapper/parking-lot.mapper";

export class CreateParkingLotUseCase {
    constructor(
        private readonly parkingLotRepository: ParkingLotRepository  // Inject the repository
    ) {}

    async execute(request: CreateParkingLotDto): Promise<ParkingLot> {
        const raw = new ParkingLot(request.capacity);

        
        const parkingLot = ParkingLotMapper.toEntity(raw);


        return this.parkingLotRepository.createParkingLot(parkingLot);
    }
}
