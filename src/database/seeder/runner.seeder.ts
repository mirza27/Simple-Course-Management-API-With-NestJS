import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { CategoryService } from '../../modules/category/category.service';
import { CourseService } from '../../modules/course/course.service';
import { categorySeeds } from './course.seeder';
import { DataSource } from 'typeorm';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const categoryService = app.get(CategoryService);
  const courseService = app.get(CourseService);

  try {
    // reset
    await dataSource.query(
      'TRUNCATE TABLE user_courses, courses, categories RESTART IDENTITY CASCADE',
    );

    // seeding
    for (const category of categorySeeds) {
      const createdCategory = await categoryService.CreateCategory({
        name: category.name,
      });

      for (const course of category.courses) {
        await courseService.CreateCourse({
          ...course,
          category_id: createdCategory.id,
        });
      }
    }
    console.log('Seed done');
  } finally {
    await app.close();
  }
}

if (require.main === module) run();
