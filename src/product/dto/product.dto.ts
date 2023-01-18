import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDTO {

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly description: string;

    @ApiProperty()
    readonly price: number;

    @ApiProperty()
    readonly stock: number

    @ApiProperty()
    readonly code: number
}