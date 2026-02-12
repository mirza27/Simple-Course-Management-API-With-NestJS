import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async GetUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async GetUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async CreateUser(userData: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(userData);

    return this.userRepository.save(newUser);
  }
}
