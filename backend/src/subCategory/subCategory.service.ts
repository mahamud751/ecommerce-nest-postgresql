import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const { categoryId, name, photos } = createSubCategoryDto;

    // Check if the category exists
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Create the subcategory
    return this.prisma.subCategory.create({
      data: {
        name,
        photos,
        category: {
          connect: { id: categoryId },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.subCategory.findMany({
      include: {
        category: true, // Include category if needed
        // Add other relations if required
      },
    });
  }

  async findOne(id: string) {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id },
      include: {
        category: true, // Include category if needed
        // Add other relations if required
      },
    });

    if (!subCategory) {
      throw new NotFoundException('SubCategory not found');
    }

    return subCategory;
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
    const { categoryId, ...updateData } = updateSubCategoryDto;

    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id },
    });

    if (!subCategory) {
      throw new NotFoundException('SubCategory not found');
    }

    const updatePayload: any = {
      ...updateData,
      ...(categoryId && {
        category: {
          connect: { id: categoryId },
        },
      }),
    };

    return this.prisma.subCategory.update({
      where: { id },
      data: updatePayload,
    });
  }

  async remove(id: string) {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id },
    });

    if (!subCategory) {
      throw new NotFoundException('SubCategory not found');
    }

    return this.prisma.subCategory.delete({
      where: { id },
    });
  }
}
