import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/database/entities/user.entity';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import { CreateCourseDto } from './dto/createCourse.dto';
import { RemoveMemberCourseDto } from './dto/removeMemberCourse.dto';
import { JoinMemberCourseDto } from './dto/joinCourse.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
  @Get(':id')
  getCourse(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.GetByIdCourse(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
  @Get('list')
  getCourses() {
    return this.courseService.GetByFilterCourse();
  }

  @Roles(UserRole.CUSTOMER)
  @Post('join')
  joinCourse(@Body() request: JoinMemberCourseDto) {
    const userId = 1;

    return this.courseService.AddMemberCourse(userId, request.course_id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  @Post('remove')
  removeCourse(@Body() request: RemoveMemberCourseDto) {
    return this.courseService.RemoveCourseMember(
      request.user_id,
      request.course_id,
    );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create')
  createCourse(@Body() request: CreateCourseDto) {
    return this.courseService.CreateCourse(request);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateCourseDto,
  ) {
    return this.courseService.UpdateCourse(id, request);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('remove-member')
  removeCourseMember(@Body() request: RemoveMemberCourseDto) {
    return this.courseService.RemoveCourseMember(
      request.user_id,
      request.course_id,
    );
  }
}
