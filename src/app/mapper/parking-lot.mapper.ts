import { ParkingLot } from "../../domain/entities/parking-lot.entity";
import { ParkingSlot } from "../../domain/entities/parking-slot.entity";
import { MinHeap } from "../../domain/shared/min-heap";
import { Car } from "../../domain/entities/car.entity";

export class ParkingLotMapper {
    static toEntity(raw: any): ParkingLot {
        const parkingLot = new ParkingLot(raw.capacity);

        const heap = new MinHeap();
        const slots: ParkingSlot[] = (raw._slots || []).map((slot: any) => {
            const parkingSlot = new ParkingSlot(slot.slotNumber);

            if (slot.vehicle) {
                // Recreate the car properly if needed
                const car = new Car(slot.vehicle.registrationNumber, slot.vehicle.color);
                parkingSlot.park(car);
            } else if (slot.slotNumber !== 0) {
                // Add only unoccupied, real slots to the heap (skip dummy index 0)
                heap.insert(slot.slotNumber);
            }

            return parkingSlot;
        });

        parkingLot['_slots'] = slots;
        parkingLot['_availableSlotsHeap'] = heap;

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
