'use strict';

import { TokenPayloadDto } from './TokenPayload.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/user.dto';
import { IUser } from '../../user/user.model';
export class LoginPayloadDto {
  @ApiProperty({ type: UserDto })
  user: IUser;
  @ApiProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(user: IUser, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
