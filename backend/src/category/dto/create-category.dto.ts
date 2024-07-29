import { IsString, IsOptional, IsArray, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'The name of the category' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Photos of the category' })
  @IsString()
  @IsOptional()
  photos?: string;

  @ApiPropertyOptional({
    description: 'Array of product IDs associated with the category',
    type: [String],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  product?: string[];

  @ApiPropertyOptional({
    description: 'Array of subcategory IDs associated with the category',
    type: [String],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  subcategory?: string[];
}
