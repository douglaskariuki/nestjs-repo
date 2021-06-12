/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    getTasks(
        filterDto: GetTaskFilterDto,
        req
    ): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, req);
    }

    async getTaskById(
        id: number,
        req    
    ): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, userId: req.user.id } });
        if(!found) {
            throw new NotFoundException(`Task with id: ${id} not found`)
        }  

        return found;
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        req
    ): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, req);
    }

    async updateTaskStatus(
        id: number, 
        status: TaskStatus,
        req
    ): Promise<Task> {
        const task = await this.getTaskById(id, req);
        task.status = status
        await task.save();
        return task;
    }

    async deleteTask(
        id: number,
        req
        ): Promise<void> {
        const result = await this.taskRepository.delete({ id, userId: req.user.id })
        if(result.affected === 0) {
            throw new NotFoundException(`Task with ID: ${id} not found`);
        }
    }
}