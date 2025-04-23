import type {ParkingLotRepository} from "../../domain/repositories/parking-lot/parking-lot.repository";
import type {AllocateParkingSlotDto} from "../dto/AllocateParkingSlotDto";
import {Car} from "../../domain/entities/car.entity";
import type {ParkingSlot} from "../../domain/entities/parking-slot.entity";

export class AllocateParkingSlotUseCase {
    constructor(private parkingLotRepository: ParkingLotRepository) {}

    async execute(request: AllocateParkingSlotDto): Promise<ParkingSlot | null> {
        const parkingLot = this.parkingLotRepository.findById(request.parkingLotId, true);

        const availableSlot = parkingLot!.getAvailableSlot()

        if(!availableSlot){
            return null;
        }

        const car = new Car(request.regNo, request.color);

        return parkingLot!.park(car);
    }
}