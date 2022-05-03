import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { DiscordStrategy } from './discord.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get<string>('JWT_EXP_H'),
    },
  }),
  inject: [ConfigService],
};

@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync(jwtFactory)],
  providers: [AuthService, UsersService, DiscordStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
