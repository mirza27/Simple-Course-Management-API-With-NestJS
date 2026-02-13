import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
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
import { ExitCourseDto } from './dto/exitCourse.dto';
import type { RequestWithUser } from 'src/common/dto/request-with-user.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
  @Get(':id')
  getCourse(@Param('id', ParseIntPipe) id: number) {
    const course = this.courseService.GetByIdCourse(id);

    return {
      message: 'Success',
      data: { course: course },
    };
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
  @Get('list')
  getCourses() {
    return this.courseService.GetByFilterCourse();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  @Post('join')
  async joinCourse(
    @Body() body: JoinMemberCourseDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.userId;

    const course = await this.courseService.AddMemberCourse(
      userId,
      body.course_id,
    );

    return {
      message: 'Successfully joined the course',
      data: { course: course },
    };
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  @Delete('exit')
  async removeCourse(@Body() body: ExitCourseDto, @Req() req: RequestWithUser) {
    await this.courseService.RemoveCourseMember(
      req.user.userId,
      body.course_id,
    );

    return {
      message: 'Successfully exited the course',
    };
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create')
  async createCourse(@Body() request: CreateCourseDto) {
    const newCourse = await this.courseService.CreateCourse(request);

    return {
      message: 'Successfully created course',
      data: { course: newCourse },
    };
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('add-member')
  async addMemberToCourse(@Body() request: RemoveMemberCourseDto) {
    const course = await this.courseService.AddMemberCourse(
      request.user_id,
      request.course_id,
    );

    return {
      message: 'Successfully added member to course',
      data: { course: course },
    };
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() req: UpdateCourseDto,
  ) {
    return this.courseService.UpdateCourse(id, req);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('remove-member')
  removeCourseMember(@Body() request: RemoveMemberCourseDto) {
    return this.courseService.RemoveCourseMember(
      request.user_id,
      request.course_id,
    );
  }
}
