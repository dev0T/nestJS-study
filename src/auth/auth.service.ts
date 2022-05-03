import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-discord';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(userId: string): Promise<any> {
    const user = await this.usersService.findOne(userId);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: Profile) {
    return user;
  }
}
