import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Student } from './student.entity';
import { CreateStudentInput } from './dto/student.input';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>,
    ) {}

    async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
        const { firstName, lastName } = createStudentInput;
        const student = this.studentRepository.create({
            id: v4(),
            firstName,
            lastName
        });

        return this.studentRepository.save(student)
    }

    async getStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async getStudent(id: string): Promise<Student> {
        return this.studentRepository.findOne({ id })
    }

    async getStudentsByIds(studentIds: string[]): Promise<Student[]> {
        return this.studentRepository.find({
            where: {
                id: {
                    $in: studentIds
                }
            }
        })
    }
}
