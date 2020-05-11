'use strict';

import { ApiProperty } from '@nestjs/swagger';


export class UserLoginDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  readonly refreshToken: string;
}
