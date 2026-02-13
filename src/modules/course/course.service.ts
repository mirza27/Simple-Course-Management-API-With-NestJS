import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, CourseStatus } from 'src/database/entities/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/createCourse.dto';
import { CategoryService } from '../category/category.service';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import {
  UserCourse,
  UserCourseStatus,
} from 'src/database/entities/user-course.entity';
import { ListCourseQueryDto } from './dto/listCourseQuery.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(UserCourse)
    private userCourseRepository: Repository<UserCourse>,

    private categoryService: CategoryService,
  ) {}

  async GetByFilterCourse(query: ListCourseQueryDto) {
    const { search, category_id, sort, page, limit } = query;

    const skip = (page - 1) * limit;

    const queryBuilder = this.courseRepository.createQueryBuilder('course');

    if (search) {
      queryBuilder.where('course.name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (category_id) {
      queryBuilder.andWhere('course.category_id = :category_id', {
        category_id,
      });
    }

    queryBuilder.orderBy('course.created_at', sort);
    queryBuilder.skip(skip).take(limit);

    const [courses, total] = await queryBuilder.getManyAndCount();

    return {
      courses: courses,
      meta: {
        total,
        page,
        limit,
      },
    };
  }

  async GetByIdCourse(id: number) {
    return this.courseRepository.findOneOrFail({ where: { id } });
  }

  async GetUserCourses(user_id: number) {
    return this.userCourseRepository.find({
      where: { user: { id: user_id }, status: UserCourseStatus.ACTIVE },
      relations: ['course'],
    });
  }

  async CreateCourse(courseData: CreateCourseDto) {
    const courseCategory = await this.categoryService.GetById(
      courseData.category_id,
    );
    if (!courseCategory) {
      throw new BadRequestException('Category not found');
    }

    const newCourse = this.courseRepository.create(courseData);

    return this.courseRepository.save(newCourse);
  }

  async UpdateCourse(id: number, courseData: UpdateCourseDto) {
    const course = await this.GetByIdCourse(id);
    if (!course) {
      throw new BadRequestException('Course not found');
    }

    if (courseData.category_id) {
      const courseCategory = await this.categoryService.GetById(
        courseData.category_id,
      );
      if (!courseCategory) {
        throw new BadRequestException('Category not found');
      }
    }

    // set inactive all user course when course is closed
    if (courseData.status == CourseStatus.CLOSED) {
      await this.userCourseRepository.update(
        { course: { id: id } },
        { status: UserCourseStatus.INACTIVE },
      );
    }

    // replace changed attributes
    Object.assign(course, courseData);

    return this.courseRepository.update(id, course);
  }

  async AddMemberCourse(user_id: number, course_id: number) {
    const userCourse = await this.userCourseRepository.findOne({
      where: {
        user: { id: user_id },
        course: { id: course_id },
      },
      relations: ['user', 'course'],
    });

    if (userCourse) {
      throw new BadRequestException('User is already a member of this course');
    }

    const newUserCourse = this.userCourseRepository.create({
      user: { id: user_id },
      course: { id: course_id },
      status: UserCourseStatus.ACTIVE,
    });

    await this.userCourseRepository.save(newUserCourse);

    return await this.courseRepository.findOne({
      where: { id: course_id },
      relations: ['category'],
    });
  }

  async RemoveCourseMember(user_id: number, course_id: number) {
    const userCourse = await this.userCourseRepository.findOne({
      where: {
        user: { id: user_id },
        course: { id: course_id },
      },
      relations: ['user', 'course'],
    });

    if (!userCourse) {
      throw new BadRequestException('User is not a member of this course');
    }

    return this.userCourseRepository.delete(userCourse.id);
  }
}
