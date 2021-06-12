import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { TaskStatus } from "./task-status.enum";
import { TasksService } from './tasks.service';
import { TaskStatusValidationPipe } from "./pipes/task-status-validation-pipe"
import { Task } from './task.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTaskFilterDto,
    @Req() req,
  ) {
    return this.tasksService.getTasks(filterDto, req);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, req);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, req);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @Req() req
  ): Promise<void> {
    return this.tasksService.deleteTask(id, req);
  }

  @Patch('/:id/status') 
  updateTaskStatus(
      @Param('id') id: number,
      @Body('status', TaskStatusValidationPipe) status: TaskStatus,
      @Req() req,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, req);
  }
}
