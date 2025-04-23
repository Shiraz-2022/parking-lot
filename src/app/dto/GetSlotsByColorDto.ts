import {Color} from "../../domain/enums/color.enum";

export interface GetSlotsByColorDto {
    color: Color;
    parkingLotId: string;
}