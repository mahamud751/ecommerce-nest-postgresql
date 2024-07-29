import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the import path according to your project structure
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client'; // Import Product type from Prisma client

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, subcategoryId, branchId, reviewId, ...rest } =
      createProductDto;

    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');

    const subcategory = subcategoryId
      ? await this.prisma.subCategory.findUnique({
          where: { id: subcategoryId },
        })
      : null;
    if (subcategoryId && !subcategory)
      throw new NotFoundException('SubCategory not found');

    const branch = branchId
      ? await this.prisma.branch.findUnique({ where: { id: branchId } })
      : null;
    if (branchId && !branch) throw new NotFoundException('Branch not found');

    const review = reviewId
      ? await this.prisma.review.findUnique({ where: { id: reviewId } })
      : null;
    if (reviewId && !review) throw new NotFoundException('Review not found');

    const product = await this.prisma.product.create({
      data: {
        ...rest,
        category: { connect: { id: categoryId } },
        subcategory: subcategoryId
          ? { connect: { id: subcategoryId } }
          : undefined,
        branch: branchId ? { connect: { id: branchId } } : undefined,
        review: reviewId ? { connect: { id: reviewId } } : undefined,
      },
    });

    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        category: true,
        subcategory: true,
        branch: true,
        review: true,
      },
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        subcategory: true,
        branch: true,
        review: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.product.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const { categoryId, subcategoryId, branchId, reviewId, ...rest } =
      updateProductDto;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...rest,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        subcategory: subcategoryId
          ? { connect: { id: subcategoryId } }
          : undefined,
        branch: branchId ? { connect: { id: branchId } } : undefined,
        review: reviewId ? { connect: { id: reviewId } } : undefined,
      },
    });
  }

  async remove(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.product.delete({ where: { id } });

    return product;
  }
}
