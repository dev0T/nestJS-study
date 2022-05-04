import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

const mongooseFactory = {
  name: User.name,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const schema = UserSchema;
    schema.pre('save', () =>
      console.log(
        `${configService.get<string>('APP_NAME')}: Hello from pre save`,
      ),
    );
    return schema;
  },
  inject: [ConfigService],
};

@Module({
  imports: [MongooseModule.forFeatureAsync([mongooseFactory], 'UsersDB')],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [MongooseModule.forFeatureAsync([mongooseFactory])],
})
export class UsersModule {}
