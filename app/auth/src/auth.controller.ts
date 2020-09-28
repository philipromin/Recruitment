import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/me')
  getMe(): string {
    return this.authService.getHello();
  }

  @Post('/signin')
  signin() {
    return 'signin';
  }

  @Post('/signup')
  signup() {
    return 'signup';
  }

  @Post('/signout')
  signout() {
    return 'signout';
  }
}
