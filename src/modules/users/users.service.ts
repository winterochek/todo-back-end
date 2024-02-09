import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../database/entities';
import { Repository } from 'typeorm';
import { SignInBody, SignUpBody } from '../auth/request';
import { UserDto } from './dto';
import {
  EmailAvailabilityBody,
  UpdateUserBody,
  UsernameAvailabilityBody,
} from './request';

@Injectable({})
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(body: SignUpBody): Promise<UserDto> {
    const userWithSameUsername = await this.userRepository.findOne({
      where: { username: body.username },
    });
    if (Boolean(userWithSameUsername)) {
      throw new BadRequestException('Username is already taken');
    }
    const userWithSameEmail = await this.userRepository.findOne({
      where: { email: body.email },
    });
    if (Boolean(userWithSameEmail)) {
      throw new BadRequestException('Email is already taken');
    }
    const hashPassword = await bcrypt.hash(body.password, 10);
    const user = await this.userRepository.save({
      ...body,
      password: hashPassword,
    });
    return UserDto.fromEntity(user);
  }

  async validate(body: SignInBody): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { email: body.email },
    });
    if (!Boolean(user)) {
      throw new NotFoundException('User with this email does not exist');
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!Boolean(isPasswordValid)) {
      throw new BadRequestException('Email or password is wrong');
    }
    return UserDto.fromEntity(user);
  }

  async getById(userId: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!Boolean(user)) {
      throw new NotFoundException();
    }
    return UserDto.fromEntity(user);
  }

  async checkEmailAvailability({
    email,
  }: EmailAvailabilityBody): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !Boolean(user);
  }

  async checkUsernameAvailability({
    username,
  }: UsernameAvailabilityBody): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { username } });
    return !Boolean(user);
  }

  async update(
    userId: number,
    id: number,
    body: UpdateUserBody,
  ): Promise<void> {
    if (userId !== id) {
      throw new ForbiddenException('No such power');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!Boolean(user)) {
      throw new NotFoundException();
    }

    if (Boolean(body?.username)) {
      const usernameAvailability = await this.checkUsernameAvailability({
        username: body.username,
      });
      if (!Boolean(usernameAvailability)) {
        throw new BadRequestException('Username is already taken');
      }
    }

    if (Boolean(body?.email)) {
      const emailAvailability = await this.checkEmailAvailability({
        email: body.email,
      });
      if (!Boolean(emailAvailability)) {
        throw new BadRequestException('Email is already taken');
      }
    }
    const update: Partial<User> = {
      ...user,
      ...body,
      password: body.password
        ? await bcrypt.hash(body.password, 10)
        : user.password,
    };
    await this.userRepository.update({ id: userId }, { ...update });
  }

  async delete(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!Boolean(user)) {
      throw new NotFoundException();
    }
    await this.userRepository.delete({ id: userId });
  }
}
