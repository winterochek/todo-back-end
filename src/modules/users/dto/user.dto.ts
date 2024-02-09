import { User } from 'src/modules/database/entities';
import { ListDto } from 'src/modules/list/dto';
import { populate } from 'src/modules/shared/populate.utility';
import { TaskDto } from 'src/modules/tasks/dto';
// import { populate } from 'src/modules/shared/populate.utility';

export class UserDto {
  public id: number;
  public username: string;
  public email: string;
  public tasks?: TaskDto[];
  public lists?: ListDto[];
  public passwordResetTokens?: any[];

  public createdAt: Date;
  public updatedAt: Date;

  static fromEntity(user?: User): UserDto | undefined {
    if (!Boolean(user)) return;
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      tasks: populate({ field: user?.tasks, callback: TaskDto.fromEntity }),
      lists: populate({ field: user?.lists, callback: ListDto.fromEntity }),
      passwordResetTokens: [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
