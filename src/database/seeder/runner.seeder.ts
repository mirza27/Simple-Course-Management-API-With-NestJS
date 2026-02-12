import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { CategoryService } from '../../modules/category/category.service';
import { CourseService } from '../../modules/course/course.service';
import { categorySeeds } from './course.seeder';
import { DataSource } from 'typeorm';
import { adminSeeds, customerSeeds } from './userSeeder';
import { AuthService } from 'src/modules/auth/auth.service';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const categoryService = app.get(CategoryService);
  const courseService = app.get(CourseService);
  const authService = app.get(AuthService);

  try {
    // reset
    await dataSource.query(
      'TRUNCATE TABLE user_auth, user_courses, courses, categories, users RESTART IDENTITY CASCADE',
    );

    // admin seeding (use AuthService.Register then enforce admin role)
    for (const admin of adminSeeds) {
      const created = await authService.Register({
        name: admin.name,
        email: admin.email,
        password: admin.password,
      });

      await dataSource.query('UPDATE users SET role = $1 WHERE id = $2', [
        admin.role,
        created.id,
      ]);
    }

    // customer seeding
    for (const customer of customerSeeds) {
      await authService.Register({
        name: customer.name,
        email: customer.email,
        password: customer.password,
      });
    }

    // course seeding
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
