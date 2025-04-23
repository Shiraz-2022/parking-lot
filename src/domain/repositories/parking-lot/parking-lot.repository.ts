import type { ParkingLot } from "../../entities/parking-lot.entity.ts";
import type {ParkingSlot} from "../../entities/parking-slot.entity.ts";
import type {BaseRepository} from "../base/base.repository.ts";

export interface ParkingLotRepository extends BaseRepository<ParkingLot>{
    addSlot(parkingLotId: string, slot: ParkingSlot): void;
}
