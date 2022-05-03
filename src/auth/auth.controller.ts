import { Controller, Req, Res, UseGuards, Get } from '@nestjs/common';
import { Response } from 'express';
import { DiscordAuthGuard } from './discord-auth.guard';
import { AuthService } from './auth.service';
import { Profile } from 'passport-discord';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(DiscordAuthGuard)
  @Get('discord/login')
  async login() {
    return;
  }

  @UseGuards(DiscordAuthGuard)
  @Get('discord/callback')
  async discordAuthRedirect(
    @Req() req: any,
    @Res() res: Response,
  ): Promise<Response> {
    const {
      user,
    }: {
      user: Profile;
    } = req;

    const jwt = await this.authService.login(user);

    res.cookie('session', jwt, { httpOnly: true });

    return res.status(201).json({ user, jwt });
  }
}
