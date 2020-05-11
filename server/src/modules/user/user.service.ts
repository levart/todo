import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user.model';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {
  }

  async findAll(): Promise<IUser> {
    let users;
    try {
      users = await this.userModel.find();
    } catch (e) {
      throw new NotFoundException(e.message);
    }

    return users.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }));
  }


  async findById(id: string): Promise<IUser> {
    let user;
    try {
      user = await this.userModel.findOne({ _id: id });
    } catch (e) {
      throw new NotFoundException('Could not find user');
    }

    if (!user) {
      throw new NotFoundException('Could not find user');
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
