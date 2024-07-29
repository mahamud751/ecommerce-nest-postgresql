import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubCategoryService } from './subcategory.service';
import { SubCategoryController } from './subcategory.controller';

@Module({
  imports: [],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, PrismaService],
})
export class SubCategoryModule {}
