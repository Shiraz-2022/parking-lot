import {Module} from "@nestjs/common";
import {ParkingLotController} from "./parking-lot.controller";
import {ParkingLotService} from "./parking-lot.service";
import {CreateParkingLotUseCase} from "../../app/use-cases/CreateParkingLotUseCase";
import {ParkingLotRepository} from "../../infra/repositories/parking-lot/parking-lot.repository";
import {ExpandParkingLotUseCase} from "../../app/use-cases/ExpandParkingLotUseCase";
import {AllocateParkingSlotUseCase} from "../../app/use-cases/AllocateParkingSlotUseCase";
import {FreeParkingSlotUseCase} from "../../app/use-cases/FreeParkingSlotUseCase";
import {GetOccupiedSlotsUseCase} from "../../app/use-cases/GetOccupiedSlotsUseCase";
import {GetVehiclesByColorUseCase} from "../../app/use-cases/GetVehiclesByColorUseCase";
import {GetSlotByVehicleUseCase} from "../../app/use-cases/GetSlotByVehicleUseCase";
import {GetSlotsByColorUseCase} from "../../app/use-cases/GetSlotsByColorUseCase";

@Module({
    controllers: [ParkingLotController],
    providers: [
        ParkingLotService,
        ParkingLotRepository,
        {
            provide: CreateParkingLotUseCase,
            useFactory: (repo: ParkingLotRepository) => {
                return new CreateParkingLotUseCase(repo);
            },
            inject: [ParkingLotRepository],
        },
        {
            provide:ExpandParkingLotUseCase,
            useFactory: (repo: ParkingLotRepository) => {
                return new ExpandParkingLotUseCase(repo);
            },
            inject: [ParkingLotRepository],
        },
        {
            provide:AllocateParkingSlotUseCase,
            useFactory: (repo: ParkingLotRepository) => {
                return new AllocateParkingSlotUseCase(repo);
            },
            inject: [ParkingLotRepository],
        },
        {
            provide:FreeParkingSlotUseCase,
            useFactory: (repo: ParkingLotRepository) => {
                return new FreeParkingSlotUseCase(repo);
            },
            inject: [ParkingLotRepository],
        },
        {
            provide:GetOccupiedSlotsUseCase,
            useFactory: (repo: ParkingLotRepository) => {
                return new GetOccupiedSlotsUseCase(repo);
            },
            inject: [ParkingLotRepository],
        },
        {
            provide:GetSlotByVehicleUseCase,
            useFactory: (repo: ParkingLotRepository) => {
                return new GetSlotByVehicleUseCase(repo);
            },
            inject: [ParkingLotRepository],
        },
        {
            provide:GetVehiclesByColorUseCase,
            useFactory: (repo: ParkingLotRepository) => {
                return new GetVehiclesByColorUseCase(repo);
            },
            inject: [ParkingLotRepository],
        },
        {
            provide:GetSlotsByColorUseCase,
            useFactory: (repo: ParkingLotRepository) => {
                return new GetSlotsByColorUseCase(repo);
            },
            inject: [ParkingLotRepository],
        }
    ],
})
export class ParkingLotModule {}
