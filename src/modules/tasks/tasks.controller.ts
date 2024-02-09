import { Body, Controller, Post, Request } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskBody } from './request';
import { AuthorizedRequest } from '../shared/types';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TaskService) {}

  @Post('')
  create(
    @Request() req: AuthorizedRequest,
    @Body() body: CreateTaskBody,
  ): Promise<void> {
    return this.taskService.create(req.user.id, body);
  }
}
