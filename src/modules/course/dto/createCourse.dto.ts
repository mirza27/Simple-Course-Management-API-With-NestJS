import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { CourseStatus } from 'src/database/entities/course.entity';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsNumber()
  @Min(1)
  category_id: number;

  @IsNumber()
  year: number;

  @IsEnum(CourseStatus)
  @IsNotEmpty()
  status: CourseStatus;
}
