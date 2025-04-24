import type {Color} from "../enums/color.enum";

export abstract class Vehicle {
    constructor(
        public readonly registrationNumber: string,
        public readonly color: Color,
    ) {
        if(!registrationNumber || !color){
            throw new Error("Vehicle registration number and color are required");
        }
    }

    abstract get type(): string;
}