import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async GetAllCategories(): Promise<Category[] | null> {
    return this.categoryRepository.find();
  }

  async GetById(id: number): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ id: id });
  }

  async CreateCategory(categoryData: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save(categoryData);
  }
}
