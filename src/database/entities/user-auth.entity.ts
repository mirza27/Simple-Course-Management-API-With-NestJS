import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_auth' })
export class UserAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @Column({ type: 'text' })
  refresh_token: string;

  @Column({ type: 'timestamptz' })
  expired_at: Date;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.authSessions, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  @Index()
  user: User;
}
