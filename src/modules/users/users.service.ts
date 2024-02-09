import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { PasswordResetToken, User } from '../database/entities';
import { Repository } from 'typeorm';
import { ResetPasswordBody, SignInBody, SignUpBody } from '../auth/request';
import { UserDto } from './dto';
import { UserRelation } from '../database/entities/user.entity';
import {
  EmailAvailabilityBody,
  UpdateUserBody,
  UsernameAvailabilityBody,
} from './request';

@Injectable({})
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(PasswordResetToken)
    private passwordResetTokenRepository: Repository<PasswordResetToken>,
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

  async getById(
    userId: number,
    self: boolean,
    relations?: UserRelation[],
  ): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations,
      });
      const assignedTasks = Boolean(self) ? [] : undefined;
      return UserDto.fromEntity(user, assignedTasks);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async checkEmailAvailability({
    email,
  }: EmailAvailabilityBody): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      return Boolean(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async checkUsernameAvailability({
    username,
  }: UsernameAvailabilityBody): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({ where: { username } });
      return Boolean(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async update(userId: number, body: UpdateUserBody): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!Boolean(user)) {
        throw new NotFoundException();
      }

      if (Boolean(body?.username)) {
        const usernameAvailability = await this.checkUsernameAvailability({
          username: body.username,
        });
        if (!Boolean(usernameAvailability)) {
          throw new BadRequestException();
        }
      }

      if (Boolean(body?.email)) {
        const emailAvailability = await this.checkEmailAvailability({
          email: body.email,
        });
        if (!Boolean(emailAvailability)) {
          throw new BadRequestException();
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
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async delete(userId: number): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!Boolean(user)) {
        throw new NotFoundException();
      }
      await this.userRepository.delete({ id: userId });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async createResetPasswordToken(userId: number): Promise<void> {
    try {
      await this.passwordResetTokenRepository.save({ userId });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async useResetPasswordToken(
    token: string,
    body: ResetPasswordBody,
  ): Promise<void> {
    try {
      const resetPasswordToken =
        await this.passwordResetTokenRepository.findOne({ where: { token } });
      if (
        Boolean(
          resetPasswordToken.used ||
            resetPasswordToken.expired ||
            resetPasswordToken.userId !== body.userId,
        )
      ) {
        throw new BadRequestException();
      }
      const hashPassword = await bcrypt.hash(body.password, 10);
      await this.userRepository.update(
        { id: body.userId },
        { password: hashPassword },
      );
      await this.passwordResetTokenRepository.update(
        { id: resetPasswordToken.id },
        { used: true },
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
