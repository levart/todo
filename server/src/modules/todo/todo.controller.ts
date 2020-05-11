import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { UserDto } from '../user/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { TodoDto } from './dtos/todo.dto';
import { ITodo } from './todo.model';
import { MyTodoDto } from './dtos/mytask.dto';

@ApiTags('Todo')
@ApiBearerAuth()
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {
  }

  @Post('all')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get my todo',
    type: TodoDto,
  })
  @UseGuards(AuthGuard('jwt'))
  getTodos(@Request() { user: { sub } }, @Body() dto: MyTodoDto): Promise<ITodo[]> {
    return this.todoService.findAll(sub, dto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get todo by id',
    type: TodoDto,
  })
  @UseGuards(AuthGuard('jwt'))
  getById(@Request() { user: { sub } }, @Param('id') id: string): Promise<ITodo> {
    return this.todoService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user by id',
    type: TodoDto,
  })
  @UseGuards(AuthGuard('jwt'))
  create(@Request() { user: { sub } }, @Body() dto: TodoDto): Promise<ITodo> {
    dto.createUserId = sub;
    return this.todoService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user by id',
    type: TodoDto,
  })
  @UseGuards(AuthGuard('jwt'))
  update(@Request() { user: { sub } }, @Param('id') id: string, @Body() dto: TodoDto): Promise<ITodo> {
    return this.todoService.update(id, dto);
  }

  @Post('/assign')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user by id',
    type: TodoDto,
  })
  @UseGuards(AuthGuard('jwt'))
  assign(@Request() { user: { sub } }, @Body() dto: TodoDto): Promise<ITodo> {
    dto.createUserId = sub;
    return this.todoService.create(dto);
  }
}
