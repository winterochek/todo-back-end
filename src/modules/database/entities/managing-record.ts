import { ManagingActionEnum } from 'src/modules/shared/types';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity('managing_records')
export class ManagingRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ManagingActionEnum })
  action: ManagingActionEnum;

  @Column({ type: 'int', name: 'supervisor_id' })
  supervisorId: number;

  @Column({ type: 'int', name: 'subordinate_id' })
  subordinateId: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
