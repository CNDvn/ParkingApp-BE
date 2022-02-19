import { number, string } from '@hapi/joi';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsMilitaryTime,
    IsNotEmpty,
    max,
    Max,
    MaxLength,
    Min,
    Validate,
    ValidateNested,
    validateOrReject,
} from 'class-validator';
import { OneToMany } from 'typeorm';

export class PromotionCreateDTO {

    @IsNotEmpty()
    @MaxLength(15)
    @ApiProperty({
        type: String, description: 'Code'
    })
    public code: string;

    @IsNotEmpty()
    @ApiProperty({
        type: Number, description: 'Percent'
    })
    public percent: number;

    @IsNotEmpty()
    @ApiProperty({
        type: String, description: 'Description'
    })
    public description: string;
}