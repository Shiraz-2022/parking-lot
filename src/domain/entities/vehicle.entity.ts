import type {Color} from "../enums/color.enum";
import { Expose } from "class-transformer";

export abstract class Vehicle {
    @Expose()
    public readonly registrationNumber: string;
    
    @Expose()
    public readonly color: Color;

    constructor(registrationNumber?: string, color?: Color) {
        if (registrationNumber === undefined || color === undefined) {
            return;
        }
        
        if (!registrationNumber || !color) {
            throw new Error("Vehicle registration number and color are required");
        }
        
        this.registrationNumber = registrationNumber;
        this.color = color;
    }

    abstract get type(): string;
}