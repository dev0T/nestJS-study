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
  id: string;

  @IsOptional()
  avatar: string;

  @IsNotEmpty()
  accessToken: string;
}
