import { AppService } from './app.service';
import { Controller, Req, Res, UseGuards, Get } from '@nestjs/common';
import { Response } from 'express';
import { User } from './users/users.service';
import { DiscordAuthGuard } from './auth/discord-auth.guard';
import { AuthService } from './auth/auth.service';
import { Profile } from 'passport-discord';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(DiscordAuthGuard)
  @Get('auth/discord/login')
  async login(@Req() req): Promise<User> {
    return this.authService.login(req.user);
  }

  @UseGuards(DiscordAuthGuard)
  @Get('auth/discord/callback')
  async discordAuthRedirect(
    @Req() req: any,
    @Res() res: Response,
  ): Promise<Response> {
    const {
      user,
      authInfo,
    }: {
      user: Profile;
      authInfo: {
        accessToken: string;
        refreshToken: string;
        expires_in: number;
      };
    } = req;

    if (!user) {
      res.redirect('/');
      return;
    }

    // const jwt = this.authService.login(user);

    // res.set('authorization', `Bearer ${jwt}`);

    return res.status(201).json({ authInfo, user });
  }
}
