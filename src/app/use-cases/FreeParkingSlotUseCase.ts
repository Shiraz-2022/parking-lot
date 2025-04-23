import type {ParkingLotRepository} from "../../domain/repositories/parking-lot/parking-lot.repository.ts";
import type {FreeParkingSlotDto} from "../dto/FreeParkingSlotDto.ts";
import type {ParkingSlot} from "../../domain/entities/parking-slot.entity.ts";

export class FreeParkingSlotUseCase {
    constructor(private parkingLotRepository: ParkingLotRepository) {}

    async execute(request: FreeParkingSlotDto): Promise<ParkingSlot | null> {
        const parkingLot = this.parkingLotRepository.findById(request.parkingLotId, true);

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

        return parkingLot!.leaveBySlot(slot!);
    }
}
