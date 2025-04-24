
import {InMemoryBaseRepository} from "../in-memory/in-memory.repository";
import type {ParkingLot} from "../../../domain/entities/parking-lot.entity";
import type {ParkingLotRepository as PLR} from "../../../domain/repositories/parking-lot/parking-lot.repository";
import {ParkingSlot} from "../../../domain/entities/parking-slot.entity";
import {ParkingLotMapper} from "../../../app/mapper/parking-lot.mapper";

export class ParkingLotRepository extends InMemoryBaseRepository<ParkingLot> implements PLR {
    createParkingLot(parkingLot: ParkingLot): any {
        const raw = this.create(parkingLot);
        const parkingLotEntity = ParkingLotMapper.toEntity(raw);

        const slots = parkingLotEntity.getAllSlots();
        slots.forEach(slot => this.addToHeap(slot));

        return {...raw};
    }
}