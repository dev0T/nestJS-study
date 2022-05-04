import { Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { DiscordProfile } from './interfaces/discord-profile.interface';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, configService: ConfigService) {
    super({
      clientID: configService.get<string>('DISCORD_CLIENT_ID'),
      clientSecret: configService.get<string>('DISCORD_SECRET'),
      callbackURL: configService.get<string>('DISCORD_CALLBACK'),
      scope: ['identify', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: DiscordProfile,
  ): Promise<User> {
    const user = await this.authService.getUserForProfile(profile);
    return user;
  }
}
