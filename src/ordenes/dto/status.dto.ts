import { IsEnum, IsOptional } from "class-validator";
import { OrdenStatus, OrdenStatusList } from "../enum/orden.enum";

export class StatusDto{


    @IsOptional()
    @IsEnum(OrdenStatusList,{message: `status must be a valid value ${OrdenStatusList}`})
    status: OrdenStatus
}