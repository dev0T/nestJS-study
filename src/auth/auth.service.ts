import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-discord';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userId: string): Promise<boolean> {
    const user = await this.usersService.findOne(userId);
    return !!user;
  }

  async login(user: Profile) {
    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
