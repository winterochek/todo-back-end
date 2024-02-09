import { IsString, Length, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserBody {
  @IsOptional()
  @IsString()
  @Length(3, 21)
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(8, 21)
  password: string;
}
