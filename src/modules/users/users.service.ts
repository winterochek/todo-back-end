import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../database/entities';
import { Repository } from 'typeorm';
import { SignInBody, SignUpBody } from '../auth/request';
import { UserDto } from './dto';
import { UserRelation } from '../database/entities/user.entity';

@Injectable({})
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(body: SignUpBody): Promise<UserDto> {
    try {
      const userWithSameUsername = await this.userRepository.findOne({
        where: { username: body.username },
      });
      if (Boolean(userWithSameUsername)) {
        throw new BadRequestException('username is already taken');
      }
      const userWithSameEmail = await this.userRepository.findOne({
        where: { email: body.email },
      });
      if (Boolean(userWithSameEmail)) {
        throw new BadRequestException('email is already taken');
      }
      const hashPassword = await bcrypt.hash(body.password, 10);
      const user = await this.userRepository.save({
        ...body,
        password: hashPassword,
      });
      return UserDto.fromEntity(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async validate(body: SignInBody): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: body.email },
      });
      if (!Boolean(user)) {
        throw new NotFoundException('user with this email does not exist');
      }
      const isPasswordValid = await bcrypt.compare(
        body.password,
        user.password,
      );
      if (!Boolean(isPasswordValid)) {
        throw new BadRequestException('email or password is wrong');
      }
      return UserDto.fromEntity(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getById(userId: number, relations?: UserRelation[]): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations,
      });
      return UserDto.fromEntity(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
