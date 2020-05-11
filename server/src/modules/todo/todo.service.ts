import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodo } from './todo.model';
import { TodoDto } from './dtos/todo.dto';
import { IUser } from '../user/user.model';
import { MyTodoDto } from './dtos/mytask.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('Todo') private readonly todoModel: Model<ITodo>,
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {
  }

  async findAll(userId: string, dto: MyTodoDto): Promise<ITodo[]> {
    let createdByMe = {};
    let status = {};
    if (dto.createdByMe && !dto.myTodo) {
      createdByMe = {
        'createdBy.id': userId,
      };
    }

    if (dto.myTodo && !dto.createdByMe) {
      createdByMe = {
        'assigned.id': userId,
      };
    }
    if (dto.status) {
      status = {
        'status': dto.status,
      };
    }

    const todos = await this.todoModel.find({ ...createdByMe, ...status }).sort({status: 'desc', dueDate: 'asc'});
    return todos.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      status: item.status,
      createdAt: item.createdAt,
      dueDate: item.dueDate,
      updatedAt: item.updatedAt,
      createdBy: item.createdBy,
      assigned: item.assigned
        ? item.assigned : null,
    }));
  }

  async findById(id: string): Promise<ITodo> {
    const todo = await this.todoModel.findById(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return {
      id: todo.id,
      name: todo.name,
      description: todo.description,
      status: todo.status,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
      dueDate: todo.dueDate,
      createdBy: todo.createdBy,
      assigned: todo.assigned ? todo.assigned : null,
    };
  }

  async create(dto: TodoDto): Promise<ITodo> {
    const user = await this.userModel.findById(dto.createUserId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (dto.assignUserId) {
      const assignUser = await this.userModel.findById(dto.assignUserId);
      if (assignUser) {
        dto.assigned = {
          id: assignUser.id,
          firstName: assignUser.firstName,
          lastName: assignUser.lastName,
          email: assignUser.email,
        };
      }
    }
    const todo = new this.todoModel({
      ...dto,
      createdBy: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
    return todo.save();
  }


  async update(id: string, dto: TodoDto): Promise<ITodo> {
    if (dto.assignUserId) {
      const assignUser = await this.userModel.findById(dto.assignUserId);
      if (assignUser) {
        console.log(assignUser);
        dto.assigned = {
          id: assignUser.id,
          firstName: assignUser.firstName,
          lastName: assignUser.lastName,
          email: assignUser.email,
        };
      }
    }
    console.log(dto);
    return await this.todoModel.findByIdAndUpdate(id, dto, { new: true });
  }


}
