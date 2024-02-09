import { Task } from 'src/modules/database/entities';
import { ListDto } from 'src/modules/list/dto';
import { UserDto } from 'src/modules/users/dto';

export class TaskDto {
  public id: number;
  public title: string;
  public description?: string;
  public deadline?: Date;
  public done: boolean;
  public list?: ListDto;
  public listId?: number;
  public user: UserDto;
  public userId: number;

  public createdAt: Date;
  public updatedAt: Date;

  static fromEntity(task?: Task): TaskDto | undefined {
    if (!Boolean(task)) return;
    return {
      id: task.id,
      title: task.title,
      deadline: task?.deadline,
      description: task?.description,
      listId: task?.listId,
      done: task.done,
      userId: task.userId,
      list: ListDto.fromEntity(task?.list),
      user: UserDto.fromEntity(task.user),
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
