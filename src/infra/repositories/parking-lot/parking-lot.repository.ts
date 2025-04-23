
import {InMemoryBaseRepository} from "../in-memory/in-memory.repository";
import type {ParkingLot} from "../../../domain/entities/parking-lot.entity";
import type {ParkingLotRepository as PLR} from "../../../domain/repositories/parking-lot/parking-lot.repository";
import {ParkingSlot} from "../../../domain/entities/parking-slot.entity";

export class ParkingLotRepository extends InMemoryBaseRepository<ParkingLot> implements PLR {
    addSlot(parkingLotId: string, slot: ParkingSlot) {

    }
}
