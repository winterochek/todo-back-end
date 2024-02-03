import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity('lists')
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Task, (task) => task?.list, { nullable: true })
  tasks?: Task[];

  @Column({ type: 'int', name: 'user_id', nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user?.lists)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}

export enum ListRelation {
  USER = 'user',
  TASKS = 'tasks',
}
