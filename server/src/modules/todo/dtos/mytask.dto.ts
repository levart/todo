import { ApiPropertyOptional } from '@nestjs/swagger';

export class MyTodoDto {
  @ApiPropertyOptional()
  createdByMe?: boolean;

  @ApiPropertyOptional()
  myTodo?: boolean;

  @ApiPropertyOptional()
  status?: TodoStatus;
}
