import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskBody, UpdateTaskBody } from './request';
import { AuthorizedRequest } from '../shared/types';
import { TaskDto } from './dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('')
  create(
    @Request() req: AuthorizedRequest,
    @Body() body: CreateTaskBody,
  ): Promise<TaskDto> {
    return this.taskService.create(req.user.id, body);
  }

  @Get('')
  mine(@Request() req: AuthorizedRequest): Promise<any[]> {
    return this.taskService.mine(req.user.id);
  }

  @Patch(':id')
  update(
    @Request() req: AuthorizedRequest,
    @Param('id') id: number,
    @Body() body: UpdateTaskBody,
  ): Promise<void> {
    return this.taskService.update(req.user.id, id, body);
  }

  @Delete(':id')
  delete(
    @Request() req: AuthorizedRequest,
    @Param('id') id: number,
  ): Promise<void> {
    return this.taskService.delete(req.user.id, id);
  }

  @Post(':id/done')
  setDone(
    @Request() req: AuthorizedRequest,
    @Param('id') id: number,
  ): Promise<void> {
    return this.taskService.setDone(req.user.id, id);
  }

  @Post(':id/undone')
  setUndone(
    @Request() req: AuthorizedRequest,
    @Param('id') id: number,
  ): Promise<void> {
    return this.taskService.setUndone(req.user.id, id);
  }
}
