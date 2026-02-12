import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/database/entities/user.entity';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CUSTOMER)
  @Get('list')
  async getCategories() {
    return await this.categoryService.GetAllCategories();
    return 'List of categories';
  }
}
