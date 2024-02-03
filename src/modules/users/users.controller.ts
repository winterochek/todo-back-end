import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuthorizedRequest } from '../shared/types';
import { UserService } from './users.service';
import { UserQuery } from './request';
import { UserDto } from './dto';

@Controller({ path: 'users' })
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  me(req: AuthorizedRequest, @Query() query: UserQuery): Promise<UserDto> {
    return this.userService.getById(req.user.id, query?.relations);
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<UserDto> {
    return this.userService.getById(id);
  }
}
