import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { AuthorizedRequest } from '../shared/types';
import { UserService } from './users.service';
import {
  EmailAvailabilityBody,
  UpdateUserBody,
  UserQuery,
  UsernameAvailabilityBody,
} from './request';
import { UserDto } from './dto';
import { Public } from '../shared/public.decorator';

@Controller({ path: 'users' })
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  me(
    @Request() req: AuthorizedRequest,
    @Query() query: UserQuery,
  ): Promise<UserDto> {
    return this.userService.getById(req.user.id, true, query?.relations);
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<UserDto> {
    return this.userService.getById(id, false);
  }

  @Public()
  @Post('email-availability')
  checkEmailAvailability(
    @Body() body: EmailAvailabilityBody,
  ): Promise<boolean> {
    return this.userService.checkEmailAvailability(body);
  }

  @Public()
  @Post('username-availability')
  checkUsernameAvailability(
    @Body() body: UsernameAvailabilityBody,
  ): Promise<boolean> {
    return this.userService.checkUsernameAvailability(body);
  }

  @Put('')
  update(
    @Request() req: AuthorizedRequest,
    @Body() body: UpdateUserBody,
  ): Promise<void> {
    return this.userService.update(req.user.id, body);
  }

  @Delete(':id')
  delete(
    @Request() req: AuthorizedRequest,
    @Param('id') id: number,
  ): Promise<void> {
    return this.userService.delete(id);
  }
}
