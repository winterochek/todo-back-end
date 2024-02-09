import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../database/entities';
import { Repository } from 'typeorm';
import { CreateTaskBody } from './request';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(userId: number, body: CreateTaskBody): Promise<void> {
    try {
      await this.taskRepository.save({ userId, ...body });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async mine(userId: number): Promise<any[]> {
    try {
      const tasks = await this.taskRepository.find({ where: { userId } });
      return tasks;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
