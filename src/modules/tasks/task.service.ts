import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List, Task } from '../database/entities';
import { Repository } from 'typeorm';
import { CreateTaskBody, UpdateTaskBody } from './request';
import { TaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(List) private listRepository: Repository<List>,
  ) {}

  async create(userId: number, body: CreateTaskBody): Promise<TaskDto> {
    const task = await this.taskRepository.save({ userId: userId, ...body });
    return TaskDto.fromEntity(task);
  }

  async mine(userId: number): Promise<TaskDto[]> {
    const tasks = await this.taskRepository.find({ where: { userId } });
    return tasks.map(TaskDto.fromEntity);
  }

  async update(
    userId: number,
    taskId: number,
    body: UpdateTaskBody,
  ): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { userId, id: taskId },
    });
    if (!Boolean(task)) {
      throw new NotFoundException();
    }
    if (Boolean(body.listId)) {
      const list = await this.listRepository.findOne({
        where: { id: body.listId },
      });
      if (!Boolean(list)) {
        throw new BadRequestException('No such list');
      }
    }
    await this.taskRepository.update({ id: taskId }, { ...body });
  }

  async setDone(userId: number, taskId: number): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { userId, id: taskId },
    });
    if (!Boolean(task)) {
      throw new NotFoundException();
    }
    if (Boolean(task.done)) {
      throw new BadRequestException('Can not done task, that is already done');
    }
    await this.taskRepository.update({ id: taskId }, { done: true });
  }

  async setUndone(userId: number, taskId: number): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { userId, id: taskId },
    });
    if (!Boolean(task)) {
      throw new NotFoundException();
    }
    if (!Boolean(task.done)) {
      throw new BadRequestException(
        'Can not undone task, that is already undone',
      );
    }
    await this.taskRepository.update({ id: taskId }, { done: false });
  }

  async delete(userId: number, taskId: number): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { userId, id: taskId },
    });
    if (!Boolean(task)) {
      throw new NotFoundException();
    }
    await this.taskRepository.delete({ id: taskId });
  }
}
