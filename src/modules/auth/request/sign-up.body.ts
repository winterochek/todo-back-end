import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpBody {
  @IsString()
  @Length(3, 21)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 21)
  password: string;
}
