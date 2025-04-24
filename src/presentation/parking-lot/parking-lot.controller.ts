/**
 * Controller handling all parking lot operations
 */
import { Body, Controller, Get, Post, Patch, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { CreateParkingLotUseCase } from "../../app/use-cases/CreateParkingLotUseCase";
import { ExpandParkingLotDto } from "../../app/dto/ExpandParkingLotDto";
import { ExpandParkingLotUseCase } from "../../app/use-cases/ExpandParkingLotUseCase";
import { AllocateParkingSlotDto } from "../../app/dto/AllocateParkingSlotDto";
import { AllocateParkingSlotUseCase } from "../../app/use-cases/AllocateParkingSlotUseCase";
import { FreeParkingSlotDto } from "../../app/dto/FreeParkingSlotDto";
import { FreeParkingSlotUseCase } from "../../app/use-cases/FreeParkingSlotUseCase";
import { GetOccupiedSlotsUseCase } from "../../app/use-cases/GetOccupiedSlotsUseCase";
import { CreateParkingLotDto } from "../../app/dto/CreateParkingLotDto";
import { GetOccupiedSlotsDto } from "../../app/dto/GetOccupiedSlotsDto";
import { GetVehiclesByColorDto } from "../../app/dto/GetVehiclesByColorDto";
import { GetVehiclesByColorUseCase } from "../../app/use-cases/GetVehiclesByColorUseCase";
import { GetSlotByVehicleDto } from "../../app/dto/GetSlotByVehicleDto";
import { GetSlotByVehicleUseCase } from "../../app/use-cases/GetSlotByVehicleUseCase";
import { GetSlotsByColorUseCase } from "../../app/use-cases/GetSlotsByColorUseCase";
import { GetSlotsByColorDto } from "../../app/dto/GetSlotsByColorDto";

@Controller('parking-lot')
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

    /**
     * Creates a new parking lot
     */
    @Post("create")
    @HttpCode(HttpStatus.CREATED)
    async createParkingLot(@Body() dto: CreateParkingLotDto) {
        return await this.createParkingLotUseCase.execute(dto);
    }

    /**
     * Expands an existing parking lot
     */
    @Patch("expand")
    @HttpCode(HttpStatus.OK)
    async expandParkingLot(@Body() dto: ExpandParkingLotDto) {
        return await this.expandParkingLotUseCase.execute(dto);
    }

    /**
     * Allocates a parking slot for a vehicle
     */
    @Post("allocate")
    @HttpCode(HttpStatus.OK)
    async allocateParkingSlot(@Body() dto: AllocateParkingSlotDto) {
        return await this.allocateParkingSlotUseCase.execute(dto);
    }

    /**
     * Frees up an occupied parking slot
     */
    @Post("free")
    @HttpCode(HttpStatus.OK)
    async freeParkingSlot(@Body() dto: FreeParkingSlotDto) {
        return await this.freeParkingSlotUseCase.execute(dto);
    }

    /**
     * Gets all occupied parking slots
     */
    @Get("slots/occupied")
    @HttpCode(HttpStatus.OK)
    async getOccupiedSlots(@Body() dto: GetOccupiedSlotsDto) {
        return await this.getOccupiedSlotsUseCase.execute(dto);
    }

    /**
     * Gets parking slot by vehicle registration number
     */
    @Get("slots/vehicle")
    @HttpCode(HttpStatus.OK)
    async getSlotByVehicleRegNo(@Body() dto: GetSlotByVehicleDto) {
        return await this.getSlotByVehicleUseCase.execute(dto);
    }

    /**
     * Gets parking slots by vehicle color
     */
    @Get("slots/color")
    @HttpCode(HttpStatus.OK)
    async getSlotsByColor(@Body() dto: GetSlotsByColorDto) {
        return await this.getSlotsByColorUseCase.execute(dto);
    }

    /**
     * Gets vehicles by color
     */
    @Get("vehicles/color")
    @HttpCode(HttpStatus.OK)
    async getVehiclesByColor(@Body() dto: GetVehiclesByColorDto) {
        return await this.getVehiclesByColorUseCase.execute(dto);
    }
}
