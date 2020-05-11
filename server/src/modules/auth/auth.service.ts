import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IUser } from '../user/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserDto } from '../user/user.dto';
import { RegisterDto } from './dtos/register.dto';
import { RefreshTokenDto, UserLoginDto } from './dtos/UserLogin.dto';
import { TokenPayloadDto } from './dtos/TokenPayload.dto';
import { IToken } from './token.model';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { configService } from '../../config/config.service';



@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Token') private readonly tokenModel: Model<IToken>,
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private readonly jwtService: JwtService,
  ) {
  }

  async registerUser(user: RegisterDto): Promise<IUser> {
      const newUser = new this.userModel(user);
      return newUser.save();
  }

  async findUserById(id: string): Promise<IUser> {
    return await this.userModel.findOne({ _id: id });
  }

  async validateUser({ email, password }: UserLoginDto): Promise<IUser> {
    const user = await this.userModel.findOne({ email: email }).select('+password');
    const isPasswordValid = await this.validateHash(password, user && user.password);
    delete user.password;
    if (!user || !isPasswordValid) {
      throw new NotFoundException('მომხმარებელი ან პაროლი არასწორია!');
    }
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }


  validateHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash || '');
  }

  async createToken(user: IUser | UserDto): Promise<TokenPayloadDto> {
    const expiresIn = parseInt(configService.getEnv('JWT_EXPIRE'));
    const payload = { email: user.email, sub: user.id };
    const lastToken = await this.tokenModel.findOne({ userId: user.id, isRevoked: false });
    let refreshTokenSecretKey = uuid();
    if (lastToken) {
      refreshTokenSecretKey = lastToken.token;
    } else {
      const token = new this.tokenModel({
        token: refreshTokenSecretKey,
        userId: user.id,
        isRevoked: false,
        type: 'refresh_token',
      });
      await token.save();
    }
    const refreshToken = jwt.sign({ sub: user.id }, refreshTokenSecretKey, { expiresIn: '14d' });
    return new TokenPayloadDto({
      expiresIn,
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken,
    });
  }

  async checkToken({ refreshToken }: RefreshTokenDto): Promise<any> {
    const decodeToken = jwt.decode(refreshToken);
    const lastTokenSecret = await this.tokenModel.findOne(
      {
        userId: decodeToken.sub,
        isRevoked: false,
      });
    if (!lastTokenSecret) {
      throw new NotFoundException();
    }
    try {
      const decoded = await jwt.verify(refreshToken, lastTokenSecret.token);
      const token = await this.tokenModel({ ...lastTokenSecret, isRevoked: true });
      token.save();
      return decoded;
    } catch (err) {
      // err
      throw new NotFoundException();
    }


  }
}
