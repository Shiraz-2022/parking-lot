import {Body, Controller, Get, Post, Patch} from "@nestjs/common";
import { CreateParkingLotUseCase } from "../../app/use-cases/CreateParkingLotUseCase";
import {ExpandParkingLotDto} from "../../app/dto/ExpandParkingLotDto";
import {ExpandParkingLotUseCase} from "../../app/use-cases/ExpandParkingLotUseCase";
import {AllocateParkingSlotDto} from "../../app/dto/AllocateParkingSlotDto";
import {AllocateParkingSlotUseCase} from "../../app/use-cases/AllocateParkingSlotUseCase";
import {FreeParkingSlotDto} from "../../app/dto/FreeParkingSlotDto";
import {FreeParkingSlotUseCase} from "../../app/use-cases/FreeParkingSlotUseCase";
import {GetOccupiedSlotsUseCase} from "../../app/use-cases/GetOccupiedSlotsUseCase";
import {CreateParkingLotDto} from "../../app/dto/CreateParkingLotDto";
import {GetOccupiedSlotsDto} from "../../app/dto/GetOccupiedSlotsDto";
import {GetVehiclesByColorDto} from "../../app/dto/GetVehiclesByColorDto";
import {GetVehiclesByColorUseCase} from "../../app/use-cases/GetVehiclesByColorUseCase";
import {GetSlotByVehicleDto} from "../../app/dto/GetSlotByVehicleDto";
import {GetSlotByVehicleUseCase} from "../../app/use-cases/GetSlotByVehicleUseCase";
import {GetSlotsByColorUseCase} from "../../app/use-cases/GetSlotsByColorUseCase";
import {GetSlotsByColorDto} from "../../app/dto/GetSlotsByColorDto";

@Controller('parking-lot')  // Use hyphenated format for consistency
export class ParkingLotController {
    constructor(
        private readonly createParkingLotUseCase: CreateParkingLotUseCase,
        private readonly expandParkingLotUseCase: ExpandParkingLotUseCase,
        private readonly allocateParkingSlotUseCase: AllocateParkingSlotUseCase,

        private readonly freeParkingSlotUseCase: FreeParkingSlotUseCase,
        private readonly getOccupiedSlotsUseCase: GetOccupiedSlotsUseCase,
        private readonly getSlotByVehicleUseCase: GetSlotByVehicleUseCase,
        private readonly getSlotsByColorUseCase: GetSlotsByColorUseCase,

        private readonly getVehiclesByColorUseCase: GetVehiclesByColorUseCase,
    ) {}

    @Post("create") // Use a specific route for creating parking lot
    async createParkingLot(@Body() dto: CreateParkingLotDto) {
        try {
            const parkingLot = await this.createParkingLotUseCase.execute(dto);
            console.log("Parking Lot Created:", parkingLot);
            return { message: 'Parking Lot Created', data: parkingLot };
        }
        catch (error){
            console.error("Error creating parking lot:", error);
            return { message: 'Error creating parking lot', error: error.message };
        }
    }

    @Patch("expand")
    async expandParkingLot(@Body() dto: ExpandParkingLotDto) {
        try {
            const parkingLot = await this.expandParkingLotUseCase.execute(dto);

            return { message: 'Parking lot expanded', data: parkingLot };
        }
        catch (error){
            console.error("Error expanding parking lot:", error);
            return { message: 'Error expanding parking lot', error: error.message };
        }
    }

    @Post("allocate")
    async allocateParkingSlot(@Body() dto: AllocateParkingSlotDto){
        try {
            const parkingSlot = await this.allocateParkingSlotUseCase.execute(dto);

            return { message: 'Parking slot allocated', data: parkingSlot };
        }
        catch (error){
            console.error("Error allocating parking slot:", error);
            return { message: 'Error allocating parking slot', error: error.message };
        }
    }

    @Post("free")
    async freeParkingSlot(@Body() dto: FreeParkingSlotDto) {
        try {
            const parkingSlot = await this.freeParkingSlotUseCase.execute(dto);

            return { message: 'Parking slot freed', data: parkingSlot };
        }
        catch (error){
            console.error("Error freeing parking slot:", error);
            return { message: 'Error freeing parking slot', error: error.message };
        }
    }

    @Get("slots/occupied")
    async getOccupiedSlots(@Body() dto:GetOccupiedSlotsDto) {
        try {
            const parkingSlots = await this.getOccupiedSlotsUseCase.execute(dto);

            return { message: 'Occupied slots retrieved', data: parkingSlots };
        }
        catch (error){
            console.error("Error retrieving occupied slots:", error);
            return { message: 'Error retrieving occupied slots', error: error.message };
        }
    }

    @Get("slots/vehicle")
    async getSlotByVehicleRegNo(@Body() dto: GetSlotByVehicleDto ){
        try {
            const parkingSlot = await this.getSlotByVehicleUseCase.execute(dto);

            return { message: 'Parking slot retrieved', data: parkingSlot };
        }
        catch (error){
            console.error("Error retrieving parking slot:", error);
            return { message: 'Error retrieving parking slot', error: error.message };
        }
    }

    @Get("slots/color")
    async getSlotsByColor(@Body() dto: GetSlotsByColorDto) {
        try {
            const parkingSlots = await this.getSlotsByColorUseCase.execute(dto);

            return { message: 'Slots by color retrieved', data: parkingSlots };
        }
        catch (error){
            console.error("Error retrieving slots by color:", error);
            return { message: 'Error retrieving slots by color', error: error.message };
        }
    }

    @Get("vehicles/color")
    async getVehiclesByColor(@Body() dto: GetVehiclesByColorDto) {
        try {
            const vehicles = await this.getVehiclesByColorUseCase.execute(dto);
            return { message: 'Vehicles by color retrieved', data: vehicles };
        }
        catch (error){
            console.error("Error retrieving vehicles by color:", error);
            return { message: 'Error retrieving vehicles by color', error: error.message };
        }
    }

}
