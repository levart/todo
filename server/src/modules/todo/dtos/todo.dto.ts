import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IUser } from '../../user/user.model';

export class TodoDto {
  @ApiHideProperty()
  createUserId: string;

  @ApiPropertyOptional()
  assignUserId: string;

  @ApiPropertyOptional()
  readonly name: string;

  @ApiPropertyOptional()
  readonly description: string;

  @ApiPropertyOptional()
  readonly status: string;

  @ApiHideProperty()
  createdBy: IUser;

  @ApiHideProperty()
  assigned: IUser;

  @ApiHideProperty()
  readonly dueDate: Date;

  @ApiPropertyOptional()
  readonly createdAt: Date;

  @ApiPropertyOptional()
  readonly updatedAt: Date;
}
