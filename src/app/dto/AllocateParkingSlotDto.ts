import type {Color} from "../../domain/enums/color.enum.ts";

export interface AllocateParkingSlotDto {
    regNo: string;
    color: Color;
    parkingLotId: string;
}
