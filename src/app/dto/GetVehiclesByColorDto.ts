import {Color} from "../../domain/enums/color.enum";

export interface GetVehiclesByColorDto {
    color: Color;
    parkingLotId: string;
}