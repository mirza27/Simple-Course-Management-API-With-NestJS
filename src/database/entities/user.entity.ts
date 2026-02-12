import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserCourse } from './user-course.entity';
import { UserAuth } from './user-auth.entity';

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  role: string;

  @Column({ type: 'timestamptz', default: () => 'now()' }) created_at: Date;
  @Column({ type: 'timestamptz', default: () => 'now()' }) updated_at: Date;

  @OneToMany(() => UserCourse, (uc) => uc.user) userCourses: UserCourse[];
  @OneToMany(() => UserAuth, (ua) => ua.user) authSessions: UserAuth[];
}
