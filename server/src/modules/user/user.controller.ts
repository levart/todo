import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from './user.model';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user by id',
    type: UserDto
  })
  @UseGuards(AuthGuard('jwt'))
  getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all user',
    type: UserDto
  })
  @UseGuards(AuthGuard('jwt'))
  findAll():Promise<IUser> {
    return this.userService.findAll();
  }

}
