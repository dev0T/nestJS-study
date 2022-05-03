import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    // change one of the below discord_id to your Discord ID, else you'll never be able to log in
    this.users = [
      {
        userId: 1,
        username: 'Teryn',
        email: 'teresa.alice.alves@gmail.com',
      },
    ];
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOne(profileId: string): Promise<User | undefined> {
    return this.users.find((user) => user.discordId === profileId);
  }
}
