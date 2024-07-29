import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: {
        subCategories: true, // Adjust to the actual field name
        products: true, // Adjust to the actual field name
      },
    });
  }

  async findOne(id: string, subcategory?: string) {
    const includeSubcategory = subcategory ? true : false;

    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        subCategories: includeSubcategory,
        products: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
  async findOneForUser(id: string, subcategory?: string) {
    const includeSubcategory = subcategory ? true : false;

    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        subCategories: includeSubcategory,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const { subCategories, products, ...rest } = updateCategoryDto;

    return this.prisma.category.update({
      where: { id },
      data: {
        ...rest,
        subCategories: subCategories
          ? {
              set: subCategories.map((subCatId) => ({ id: subCatId })),
            }
          : undefined,
        products: products
          ? {
              set: products.map((productId) => ({ id: productId })),
            }
          : undefined,
      },
    });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.category.delete({ where: { id } });
  }
}
