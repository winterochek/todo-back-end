import { Task, User } from 'src/modules/database/entities';
// import { populate } from 'src/modules/shared/populate.utility';

export class UserDto {
  public id: number;
  public username: string;
  public email: string;
  public tasks?: any[];
  // public assignedTasks?: any[];
  public lists?: any[];
  public passwordResetTokens?: any[];
  // public supervisors?: UserDto[];
  // public subordinates?: UserDto[];

  public createdAt: Date;
  public updatedAt: Date;

  static fromEntity(user: User, assignedTasks?: Task[]): UserDto {
    console.log(assignedTasks);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      tasks: [],
      // assignedTasks: [],
      lists: [],
      passwordResetTokens: [],
      // supervisors: populate({
      //   field: user.supervisors,
      //   callback: UserDto.fromEntity,
      // }),
      // subordinates: populate({
      //   field: user.subordinates,
      //   callback: UserDto.fromEntity,
      // }),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
