import { Body, Controller, Post, Request } from '@nestjs/common';
import { ListService } from './list.service';
import { AuthorizedRequest } from '../shared/types';
import { CreateListBody } from './request';

@Controller({ path: 'list' })
export class ListController {
  constructor(private listService: ListService) {}

  @Post('')
  create(
    @Request() req: AuthorizedRequest,
    @Body() body: CreateListBody,
  ): Promise<any> {
    return this.listService.create(req.user.id, body);
  }
}
