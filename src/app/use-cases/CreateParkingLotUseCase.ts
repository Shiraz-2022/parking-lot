import { ParkingLot } from '../../domain/entities/parking-lot.entity';
import { ParkingLotRepository } from "../../domain/repositories/parking-lot/parking-lot.repository";
import {CreateParkingLotDto} from "../dto/CreateParkingLotDto";

export class CreateParkingLotUseCase {
    constructor(
        private readonly parkingLotRepository: ParkingLotRepository  // Inject the repository
    ) {}

    async execute(request: CreateParkingLotDto): Promise<ParkingLot> {
        const parkingLot = new ParkingLot(request.capacity);
        return this.parkingLotRepository.create(parkingLot);  // Use the repository to create the parking lot
    }
}
