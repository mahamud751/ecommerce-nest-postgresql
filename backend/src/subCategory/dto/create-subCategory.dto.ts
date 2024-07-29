import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateSubCategoryDto {
  @ApiProperty({ description: 'Name of the subcategory' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Photos associated with the subcategory',
    required: false,
  })
  @IsString()
  @IsOptional()
  photos?: string;

  @ApiProperty({ description: 'ID of the associated category' })
  @IsString()
  categoryId: string;

  @ApiProperty({
    description: 'List of product IDs associated with the subcategory',
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  product?: string[];
}
