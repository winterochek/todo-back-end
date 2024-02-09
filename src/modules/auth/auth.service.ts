import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInBody, SignUpBody } from './request';

@Injectable({})
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(body: SignInBody): Promise<{ accessToken: string }> {
    const user = await this.userService.validate(body);
    return await this.getAccessToken(user.id, user.email);
  }

  async signUp(body: SignUpBody): Promise<{ accessToken: string }> {
    const user = await this.userService.create(body);
    return await this.getAccessToken(user.id, user.email);
  }

  async getAccessToken(
    id: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = { sub: id, email };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
