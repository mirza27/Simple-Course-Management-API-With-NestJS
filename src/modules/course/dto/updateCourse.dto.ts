import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CourseStatus } from 'src/database/entities/course.entity';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  category_id?: number;

  @IsOptional()
  year?: number;

  @IsOptional()
  @IsEnum(CourseStatus)
  status?: string;
}
