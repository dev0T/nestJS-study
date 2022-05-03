import { Strategy, Profile as DiscordProfile } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/users.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
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
    const user = await this.authService.validateUser(profile.id);
    if (!user) {
      // create user
      throw new UnauthorizedException();
    }
    return profile;
  }
}
