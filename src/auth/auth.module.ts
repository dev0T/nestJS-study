import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { DiscordStrategy } from './discord.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, UsersService, DiscordStrategy],
  exports: [AuthService],
})
export class AuthModule {}
