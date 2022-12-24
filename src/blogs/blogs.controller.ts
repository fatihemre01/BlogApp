import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlogsService } from './blogs.service';
import { BlogDto } from './dto/blog.dto';
import { Blog } from './schemas/blog.schema';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createBlog(@Request() req: any, @Body() dto: BlogDto): Promise<Blog> {
    return this.blogsService.createBlog(req, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateBlog(@Body() dto: BlogDto, @Param('id') id: string): Promise<Blog> {
    return this.blogsService.updateBlog(dto, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  removeBlog(@Body() dto: BlogDto, @Param('id') id: string): Promise<Blog> {
    return this.blogsService.removeBlog(dto, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-blogs')
  getCurrentUserBlogs(@Request() req: any): Promise<Blog[]> {
    return this.blogsService.getCurrentUserBlogs(req);
  }

  @Get()
  getallBlogs(): Promise<Blog[]> {
    return this.blogsService.getallBlogs();
  }

  @Get(':id')
  getOneBlog(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.getOneBlog(id);
  }
}
