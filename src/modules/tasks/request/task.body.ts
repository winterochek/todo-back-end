import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTaskBody {
  @IsString()
  @Length(4, 255)
  title: string;

  @IsOptional()
  @IsString()
  @Length(4, 255)
  description?: string;

  @IsOptional()
  @IsDateString()
  deadline?: Date;

  @IsOptional()
  @IsInt()
  listId?: number;
}

export class UpdateTaskBody {
  @IsOptional()
  @IsString()
  @Length(4, 255)
  title: string;

  @IsOptional()
  @IsString()
  @Length(4, 255)
  description?: string;

  @IsOptional()
  @IsDateString()
  deadline?: Date;

  @IsOptional()
  @IsInt()
  listId: number;
}
