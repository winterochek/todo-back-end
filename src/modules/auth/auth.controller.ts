import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResetPasswordBody, SignInBody, SignUpBody } from './request';
import { Public } from '../shared/public.decorator';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @Public()
  signUp(@Body() signUpBody: SignUpBody): Promise<{
    accessToken: string;
  }> {
    return this.authService.signUp(signUpBody);
  }

  @Post('sign-in')
  @Public()
  signIn(@Body() signInBody: SignInBody): Promise<{
    accessToken: string;
  }> {
    return this.authService.signIn(signInBody);
  }

  @Public()
  @Post('reset-pasword/:id')
  createResetPasswordToken(@Param('id') id: number): Promise<void> {
    return this.authService.createResetPasswordToken(id);
  }

  @Public()
  @Post('new-password/:token')
  useResetPasswordToken(
    @Param('token') token: string,
    @Body() body: ResetPasswordBody,
  ): Promise<void> {
    return this.authService.useResetPasswordToken(token, body);
  }
}
