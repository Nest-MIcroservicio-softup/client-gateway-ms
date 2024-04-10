import { IsArray, ArrayMinSize, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OrderItemDto } from "./order-item.dto";

export class CreateOrdeneDto {
    
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[]
}
