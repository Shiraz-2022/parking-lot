import {InMemoryBaseRepository} from "../in-memory/in-memory.repository";
import  {ParkingLot} from "../../../domain/entities/parking-lot.entity";
import type {ParkingLotRepository as PLR} from "../../../domain/repositories/parking-lot/parking-lot.repository";
import {ParkingSlot} from "../../../domain/entities/parking-slot.entity";
import {ParkingLotMapper} from "../../../app/mapper/parking-lot.mapper";

export class ParkingLotRepository extends InMemoryBaseRepository<ParkingLot> implements PLR {
    createParkingLot(parkingLotEntity: ParkingLot): any {
        // Push all slots into the heap
        const slots = parkingLotEntity.getAllSlots();
        slots.forEach(slot => this.addToHeap(slot));

        const raw = this.create(parkingLotEntity);
        return ParkingLotMapper.toEntity(raw);
    }

    updateParkingLot(_id: string, parkingLotEntity: ParkingLot, addedSlotsCount: number): any {
        const totalSlots = parkingLotEntity.getTotalSlots();
        const newSlotsStartIndex = totalSlots - addedSlotsCount;

        const newSlots = parkingLotEntity.getAllSlots().slice(newSlotsStartIndex);

        const raw = this.update(_id, parkingLotEntity);
        const updatedParkingLot = ParkingLotMapper.toEntity(raw);

        newSlots.forEach(slot => this.addToHeap(slot));

        return updatedParkingLot;
    }
}