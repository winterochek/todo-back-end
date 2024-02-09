import { IsEmail, IsString, Length } from 'class-validator';

export class EmailAvailabilityBody {
  @IsEmail()
  email: string;
}

export class UsernameAvailabilityBody {
  @IsString()
  @Length(3, 21)
  username: string;
}
