import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { UserCourse } from './user-course.entity';
import { JoinColumn } from 'typeorm';

export enum CourseStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_id' })
  category_id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column()
  year: number;

  @Column({ nullable: false })
  status: string;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  updated_at: Date;

  @OneToMany(() => UserCourse, (uc) => uc.course) userCourses: UserCourse[];

  @ManyToOne(() => Category, (category) => category.courses, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
