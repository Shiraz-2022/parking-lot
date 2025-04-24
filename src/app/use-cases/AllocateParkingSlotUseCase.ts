import type {ParkingLotRepository} from "../../domain/repositories/parking-lot/parking-lot.repository";
import type {AllocateParkingSlotDto} from "../dto/AllocateParkingSlotDto";
import {Car} from "../../domain/entities/car.entity";
import type {ParkingSlot} from "../../domain/entities/parking-slot.entity";
import {ParkingLotMapper} from "../mapper/parking-lot.mapper";

export class AllocateParkingSlotUseCase {
    constructor(private parkingLotRepository: ParkingLotRepository) {}

    async execute(request: AllocateParkingSlotDto): Promise<ParkingSlot | null> {
        const raw = this.parkingLotRepository.findById(request.parkingLotId, true);

        const parkingLot = ParkingLotMapper.toEntity(raw);

        const car = new Car(request.regNo, request.color);

        const nextAvailableSlot : ParkingSlot = this.parkingLotRepository.peekMin();

        console.log("nextAvailable", nextAvailableSlot);

        if (nextAvailableSlot == null) return null;

        const slot = parkingLot!.park(car, nextAvailableSlot);

        this.parkingLotRepository.removeFromHeap();

        const val = this.parkingLotRepository.update(request.parkingLotId, parkingLot);

        console.log("val", parkingLot);

        return slot;
    }
}