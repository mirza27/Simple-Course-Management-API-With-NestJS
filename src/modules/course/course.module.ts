import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/database/entities/course.entity';
import { UserModule } from '../user/user.module';
import { CategoryModule } from '../category/category.module';
import { UserCourse } from 'src/database/entities/user-course.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, UserCourse]),
    UserModule,
    CategoryModule,
    AuthModule,
  ],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
