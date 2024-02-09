import { IsString, Length, IsInt } from 'class-validator';

export class ResetPasswordBody {
  @IsInt()
  userId: number;

  @IsString()
  @Length(8, 21)
  password: string;
}
