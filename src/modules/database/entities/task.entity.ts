import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { List } from './list.entity';
import { User } from './user.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'boolean' })
  done: boolean;

  @Column({ type: 'datetime', nullable: true })
  deadline?: Date;

  @Column({ type: 'int', name: 'supervisor_id', nullable: true })
  supervisorId?: number;

  @Column({ type: 'int', name: 'user_id', nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user?.tasks, { nullable: false })
  user: User;

  @Column({ type: 'int', name: 'list_id', nullable: true })
  listId?: number;

  @ManyToOne(() => List, (list) => list?.tasks, { nullable: true })
  @JoinColumn([{ name: 'list_id', referencedColumnName: 'id' }])
  list?: List;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}

export enum TaskRelation {
  USER = 'user',
  LIST = 'list',
}
