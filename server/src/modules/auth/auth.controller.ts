import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDto } from '../user/user.dto';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dtos/register.dto';
import { IUser } from '../user/user.model';
import { LoginPayloadDto } from './dtos/LoginPayload.dto';
import { RefreshTokenDto, UserLoginDto } from './dtos/UserLogin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  async userRegister(@Body() registerDto: RegisterDto): Promise<IUser> {
    return await this.authService.registerUser(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async userLogin(@Body() userLoginDto: UserLoginDto): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);
    const token = await this.authService.createToken(userEntity);
    return new LoginPayloadDto(userEntity, token);
  }

  @Post('token')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'Refresh user access token',
  })
  async token(@Body() refreshTokenDto: RefreshTokenDto): Promise<LoginPayloadDto> {
    const checkToken = await this.authService.checkToken(refreshTokenDto);
    const userEntity = await this.authService.findUserById(checkToken.sub);
    const token = await this.authService.createToken(userEntity);
    return new LoginPayloadDto(userEntity, token);
  }

}
