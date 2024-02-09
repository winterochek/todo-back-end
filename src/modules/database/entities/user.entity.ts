import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Task } from './task.entity';
import { List } from './list.entity';
import { PasswordResetToken } from './password-reset-token.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Task, (task) => task.user, { nullable: true })
  tasks?: Task[];

  @OneToMany(() => List, (list) => list.user, { nullable: true })
  lists?: List[];

  @OneToMany(() => PasswordResetToken, (token) => token.user, {
    nullable: true,
  })
  passwordResetTokens?: PasswordResetToken[];

  // @OneToMany(() => User, (user) => user?.supervisors, { nullable: true })
  // supervisors?: User[];

  // @OneToMany(() => User, (user) => user?.subordinates, { nullable: true })
  // subordinates?: User[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}

export enum UserRelation {
  TASKS = 'tasks',
  LISTS = 'lists',
  PASSWORD_RESET_TOKEN = 'passwordResetTokens',
  // SUPERVISORS = 'supervisors',
  // SUBORDINATES = 'subordinates',
}
