import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInBody, SignUpBody } from './request';
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
}
