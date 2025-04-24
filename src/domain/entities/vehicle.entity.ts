/**
 * Abstract base class for all vehicle types
 */
import type {Color} from "../enums/color.enum";
import { Expose } from "class-transformer";

export abstract class Vehicle {
    @Expose()
    public readonly registrationNumber: string;
    
    @Expose()
    public readonly color: Color;

    /**
     * Creates a new vehicle with registration number and color
     */
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

    /**
     * Gets the type of vehicle
     */
    abstract get type(): string;
}