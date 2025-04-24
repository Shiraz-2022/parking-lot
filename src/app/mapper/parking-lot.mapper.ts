import { ParkingLot } from "../../domain/entities/parking-lot.entity";
import { ParkingSlot } from "../../domain/entities/parking-slot.entity";

export class ParkingLotMapper {
    static toEntity(raw: any): ParkingLot {
        const parkingLot = new ParkingLot(raw.capacity);

        // Clear current slots and rehydrate from raw
        parkingLot['_slots'] = (raw._slots || []).map((slot: any) => {
            const parkingSlot = new ParkingSlot(slot.slotNumber);

            if (slot.vehicle) {
                // Assuming slot.vehicle is already a Car, otherwise use new Car()
                parkingSlot.park(Object.assign({}, slot.vehicle));
            }

            return parkingSlot;
        });

        return parkingLot;
    }
}

// import { plainToInstance } from 'class-transformer';
// import { ParkingLot } from '../../domain/entities/parking-lot.entity';
//
// export class ParkingLotMapper {
//     static toEntity(raw: any): ParkingLot {
//         return plainToInstance(ParkingLot, raw);
//     }
// }
