import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { DiscordProfile } from './interfaces/discord-profile.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getUserForProfile(userProfile: DiscordProfile): Promise<User> {
    const user = await this.usersService.findOrCreate(userProfile);
    return user;
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.usersService.findOne(userId);
    return user;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.discordId,
    };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
