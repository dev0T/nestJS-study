import { AppService } from './app.service';
import { Controller, Req, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUser(@Req() req): any {
    return req.user;
  }
}
