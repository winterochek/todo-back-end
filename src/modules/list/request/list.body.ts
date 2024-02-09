import { IsString, Length, IsOptional } from 'class-validator';

export class CreateListBody {
  @IsString()
  @Length(4, 255)
  title: string;

  @IsOptional()
  @IsString()
  @Length(4, 255)
  description?: string;
}

export class UpdateListBody {
  @IsOptional()
  @IsString()
  @Length(4, 255)
  title: string;

  @IsOptional()
  @IsString()
  @Length(4, 255)
  description?: string;
}
