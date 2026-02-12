import { IsString, IsNotEmpty, IsInt, IsDate } from 'class-validator';

export class UserAuthDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  refresh_token: string;

  @IsDate()
  @IsNotEmpty()
  expired_at: Date;
}
