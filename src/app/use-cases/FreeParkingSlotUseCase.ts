import type {ParkingLotRepository} from "../../domain/repositories/parking-lot/parking-lot.repository.ts";
import type {FreeParkingSlotDto} from "../dto/FreeParkingSlotDto.ts";
import type {ParkingSlot} from "../../domain/entities/parking-slot.entity.ts";
import {ParkingLotMapper} from "../mapper/parking-lot.mapper";

export class FreeParkingSlotUseCase {
    constructor(private parkingLotRepository: ParkingLotRepository) {}

    async execute(request: FreeParkingSlotDto): Promise<ParkingSlot> {
        const raw = this.parkingLotRepository.findById(request.parkingLotId, true);

        const parkingLot = ParkingLotMapper.toEntity(raw);

        if (!request.slotNumber && !request.regNo) {
            throw new Error("Either slot number or vehicle registration number must be provided");
        }

        let slot: ParkingSlot | null = null;

        if (request.slotNumber) {
            slot = parkingLot!.getSlotByNumber(request.slotNumber);
            if (!slot) {
                throw new Error(`Slot with number ${request.slotNumber} does not exist`);
            }
        } else if (request.regNo) {
            slot = parkingLot!.getSlotByRegNo(request.regNo);
            if (!slot) {
                throw new Error(`No slot found for vehicle with registration number ${request.regNo}`);
            }
        }

        const freeSlot = parkingLot!.leaveBySlot(slot!);

        this.parkingLotRepository.addToHeap(freeSlot);

        return freeSlot;
    }
}
