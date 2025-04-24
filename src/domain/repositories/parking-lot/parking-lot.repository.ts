import type { ParkingLot } from "../../entities/parking-lot.entity.ts";
import type {ParkingSlot} from "../../entities/parking-slot.entity.ts";
import {InMemoryBaseRepository} from "../../../infra/repositories/in-memory/in-memory.repository";

export interface ParkingLotRepository extends InMemoryBaseRepository<ParkingLot>{
    createParkingLot(parkingLotEntity: ParkingLot): ParkingLot;
    updateParkingLot(_id:string, parkingLotEntity: ParkingLot, addedSlots: number): ParkingLot;
}
