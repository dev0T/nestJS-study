import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  @IsNotEmpty()
  discordId: string;

  @IsOptional()
  avatar: string;

  @IsNotEmpty()
  accessToken: string;
}
