import { Controller, Post, Get, Query, Param, Body } from '@nestjs/common';

@Controller('episode')
export class EpisodeController {
  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    console.log(`Sorting in ${sort} order`);

    return `This action returns all episodes sorted in ${sort} order`;
  }

  @Get('featured')
  findFeatured() {
    return 'featured episodes';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return `one episode ${id}`;
  }

  @Post()
  create(@Body() input: any) {
    console.log(input);
    return `This action creates a new episode ${JSON.stringify(input)}`;
  }
}
