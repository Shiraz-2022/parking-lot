import { plainToInstance } from 'class-transformer';
import { ParkingLot } from '../../domain/entities/parking-lot.entity';
import { ParkingSlot } from '../../domain/entities/parking-slot.entity';
import { Car } from '../../domain/entities/car.entity';

export class ParkingLotMapper {
    static toEntity(raw: any): ParkingLot {
        const parkingLot = plainToInstance(ParkingLot, raw, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
        });

        // Ensure slots are properly initialized
        if (parkingLot.getAllSlots) {
            const slots = parkingLot.getAllSlots();
            slots.forEach(slot => {
                if (slot.vehicle) {
                    const vehicle = plainToInstance(Car, slot.vehicle, {
                        enableImplicitConversion: true,
                        excludeExtraneousValues: true,
                        exposeUnsetFields: false,
                    });
                    // Create a new slot with the vehicle instead of using park
                    const newSlot = new ParkingSlot(slot.slotNumber, vehicle);
                    // Replace the slot in the array
                    const index = slots.indexOf(slot);
                    if (index !== -1) {
                        slots[index] = newSlot;
                        // Update the vehicle maps
                        parkingLot.updateVehicleMaps(vehicle, newSlot);
                    }
                }
            });
        }

        return parkingLot;
    }
}
