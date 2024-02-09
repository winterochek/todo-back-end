import { List } from 'src/modules/database/entities';
import { populate } from 'src/modules/shared/populate.utility';
import { TaskDto } from 'src/modules/tasks/dto';
import { UserDto } from 'src/modules/users/dto';

export class ListDto {
  public id: number;
  public title: string;
  public description?: string;
  public user: UserDto;
  public userId: number;
  public tasks?: TaskDto[];

  public createdAt: Date;
  public updatedAt: Date;

  static fromEntity(list?: List): ListDto | undefined {
    if (!Boolean(list)) return;
    return {
      id: list.id,
      title: list.title,
      description: list?.description,
      userId: list.userId,
      tasks: populate({ field: list.tasks, callback: TaskDto.fromEntity }),
      user: UserDto.fromEntity(list.user),
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    };
  }
}
