import { IsDate, IsInt, IsOptional, IsString, Length } from 'class-validator';

export class CreateTaskBody {
  @IsString()
  @Length(4, 255)
  title: string;

  @IsOptional()
  @IsString()
  @Length(4, 255)
  description?: string;

  @IsOptional()
  @IsDate()
  deadline?: Date;

  @IsOptional()
  @IsInt()
  listId: number;
}
