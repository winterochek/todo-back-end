import { IsEnum, IsOptional } from 'class-validator';
import { UserRelation } from 'src/modules/database/entities/user.entity';

export class UserQuery {
  @IsOptional()
  @IsEnum(UserRelation, { each: true })
  relations?: UserRelation[];
}
