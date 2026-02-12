import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class JoinMemberCourseDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  user_id: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  course_id: number;
}
