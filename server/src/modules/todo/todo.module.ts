import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModel } from './todo.model';
import { UserModel } from '../user/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Todo', schema: TodoModel },
      { name: 'User', schema: UserModel },
    ]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {
}
