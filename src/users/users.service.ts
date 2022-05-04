import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { DiscordProfile } from 'src/auth/interfaces/discord-profile.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async removeAll() {
    await this.userModel.deleteMany({});
    return `All entries removed from db.`;
  }

  async findOne(userProfile: DiscordProfile): Promise<User | undefined> {
    const filter = { discordId: userProfile.id };
    const projection = { _id: 0 };
    return this.userModel.findOne(filter, projection);
  }

  async findOrCreate(userProfile: DiscordProfile): Promise<User | undefined> {
    return this.userModel.findOneAndUpdate(
      { discordId: userProfile.id },
      userProfile,
      {
        new: true,
        upsert: true,
      },
    );
  }
}
