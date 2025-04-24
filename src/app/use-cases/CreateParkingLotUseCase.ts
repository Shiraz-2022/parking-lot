/**
 * Use case for creating a new parking lot
 */
import { ParkingLot } from '../../domain/entities/parking-lot.entity';
import { ParkingLotRepository } from "../../domain/repositories/parking-lot/parking-lot.repository";
import {CreateParkingLotDto} from "../dto/CreateParkingLotDto";
import {ParkingLotMapper} from "../mapper/parking-lot.mapper";

export class CreateParkingLotUseCase {
    constructor(
        private readonly parkingLotRepository: ParkingLotRepository  // Inject the repository
    ) {}

    /**
     * Creates a new parking lot with specified capacity
     */
    async execute(request: CreateParkingLotDto): Promise<ParkingLot> {
        const parkingLot = new ParkingLot(request.capacity);
        return this.parkingLotRepository.createParkingLot(parkingLot);
    }
}
