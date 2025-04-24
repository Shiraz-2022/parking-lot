
import {InMemoryBaseRepository} from "../in-memory/in-memory.repository";
import  {ParkingLot} from "../../../domain/entities/parking-lot.entity";
import type {ParkingLotRepository as PLR} from "../../../domain/repositories/parking-lot/parking-lot.repository";
import {ParkingSlot} from "../../../domain/entities/parking-slot.entity";
import {ParkingLotMapper} from "../../../app/mapper/parking-lot.mapper";

export class ParkingLotRepository extends InMemoryBaseRepository<ParkingLot> implements PLR {
    createParkingLot(parkingLotEntity: ParkingLot): any {
        // Add placeholder slot at index 0
        parkingLotEntity.getAllSlots().unshift(new ParkingSlot(0)); // Slot number 0 is placeholder

        // Push real slots (starting from index 1) into the heap
        const slots = parkingLotEntity.getAllSlots().slice(1); // Skip index 0
        slots.forEach(slot => this.addToHeap(slot));

        const raw = this.create(parkingLotEntity);

        return { ...raw };
    }


    updateParkingLot(_id: string, parkingLotEntity: ParkingLot, addedSlotsCount: number): any {
        const totalSlots = parkingLotEntity.getTotalSlots();
        const newSlotsStartIndex = totalSlots - addedSlotsCount;

        const newSlots = parkingLotEntity.getAllSlots().slice(newSlotsStartIndex);

        const raw = this.update(_id, parkingLotEntity);

        newSlots.forEach(slot => this.addToHeap(slot));

        return { ...raw };
    }
}