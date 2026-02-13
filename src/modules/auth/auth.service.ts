import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/registerUser.dto';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserService } from '../user/user.service';
import { User, UserRole } from 'src/database/entities/user.entity';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserAuth } from 'src/database/entities/user-auth.entity';

interface JwtPayload {
  name: string;
  userId: number;
  email: string;
  role: string;
  expiredAt: Date;
  token_type?: 'access' | 'refresh';
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserAuth)
    private userAuthRepository: Repository<UserAuth>,

    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async Register(userData: RegisterUserDto) {
    const existedUser = await this.userService.GetUserByEmail(userData.email);
    if (existedUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(userData.password);

    const newUser: CreateUserDto = {
      ...userData,
      role: UserRole.CUSTOMER,
      password: hashedPassword,
    };

    const user = await this.userService.CreateUser(newUser);

    return user;
  }

  async Login(loginData: LoginUserDto) {
    const user = await this.userService.GetUserByEmail(loginData.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await this.isCorrectPassword(
      loginData.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect password');
    }

    const access_token = await this.createAccessToken(user);
    const refresh_token = await this.createAndSaveRefreshToken(user);

    return { access_token, refresh_token };
  }

  async GetLoggedUser(userId: number) {
    const user = await this.userService.GetUserById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async Logout(userId: number) {
    await this.userAuthRepository.update(
      { user_id: userId },
      {
        refresh_token: '',
        expired_at: new Date(),
        updated_at: new Date(),
      },
    );
  }

  async createAccessToken(user: User) {
    const payload: JwtPayload = {
      name: user.name,
      userId: user.id,
      email: user.email,
      role: user.role,
      token_type: 'access',
      expiredAt: new Date(
        Date.now() +
          parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION || '3600') * 1000,
      ),
    };

    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }

  async createAccessTokenByRefreshToken(access_token: string) {
    const AccessToken = await this.validateToken(access_token);
    const user = await this.userService.GetUserByEmail(AccessToken.email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const newAccessToken = await this.createAccessToken(user);
    return newAccessToken;
  }

  async createAndSaveRefreshToken(user: User) {
    const payload: JwtPayload = {
      name: user.name,
      userId: user.id,
      email: user.email,
      role: user.role,
      token_type: 'refresh',
      expiredAt: new Date(
        Date.now() +
          parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION || '604800') * 1000,
      ),
    };

    const refresh_token = await this.jwtService.signAsync(payload);

    // upsert refresh token per user
    const existing = await this.userAuthRepository.findOne({
      where: { user: { id: user.id } },
    });

    const userAuth: DeepPartial<UserAuth> = {
      id: existing?.id,
      user: { id: user.id } as User,
      refresh_token,
      expired_at: payload.expiredAt,
    };

    await this.userAuthRepository.save(userAuth);

    return refresh_token;
  }

  async validateToken(token: string): Promise<JwtPayload> {
    const result = await this.jwtService.verifyAsync<JwtPayload>(token);
    return result;
  }

  async getUserAuthByUserId(userId: number): Promise<UserAuth[]> {
    return this.userAuthRepository.find({
      where: { user: { id: userId } },
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  private async isCorrectPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
