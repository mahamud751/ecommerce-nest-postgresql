import { IsOptional, IsString, IsArray, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'The name of the category' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The photos associated with the category',
  })
  photos?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @ApiPropertyOptional({
    type: [String],
    description: 'List of subcategory IDs',
  })
  subCategories?: string[]; // Assuming IDs are strings

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @ApiPropertyOptional({ type: [String], description: 'List of product IDs' })
  products?: string[]; // Assuming IDs are strings
}
