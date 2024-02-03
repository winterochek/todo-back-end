import { IsEmail, IsString, Length } from 'class-validator';

export class SignInBody {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 21)
  password: string;
}
