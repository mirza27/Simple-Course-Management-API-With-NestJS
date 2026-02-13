import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class ExitCourseDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  course_id: number;
}
