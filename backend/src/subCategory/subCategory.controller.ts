import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SubCategoryService } from './subcategory.service';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';

@ApiTags('SubCategories')
@Controller('subcategories')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subcategory' })
  @ApiResponse({
    status: 201,
    description: 'The subcategory has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoryService.create(createSubCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all subcategories' })
  @ApiResponse({ status: 200, description: 'List of subcategories' })
  findAll() {
    return this.subCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a subcategory by ID' })
  @ApiParam({ name: 'id', description: 'ID of the subcategory to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'The subcategory with the given ID',
  })
  @ApiResponse({ status: 404, description: 'SubCategory not found' })
  findOne(@Param('id') id: string) {
    return this.subCategoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a subcategory by ID' })
  @ApiParam({ name: 'id', description: 'ID of the subcategory to update' })
  @ApiResponse({ status: 200, description: 'The updated subcategory' })
  @ApiResponse({ status: 404, description: 'SubCategory not found' })
  update(
    @Param('id') id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.subCategoryService.update(id, updateSubCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subcategory by ID' })
  @ApiParam({ name: 'id', description: 'ID of the subcategory to delete' })
  @ApiResponse({ status: 200, description: 'The deleted subcategory' })
  @ApiResponse({ status: 404, description: 'SubCategory not found' })
  remove(@Param('id') id: string) {
    return this.subCategoryService.remove(id);
  }
}
