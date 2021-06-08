import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AssignStudentsToLessonInput } from "./dto/assignStuToLess.input";
import { CreateLessonInput } from "./dto/lesson.input";
import { Lesson } from "./lesson.entity";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";
import { StudentService } from "../student/student.service"

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
    ) {}

    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string,
    ) {
        return this.lessonService.getLesson(id)
    }

    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getLessons();
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args("createLessonInput") createLessonInput: CreateLessonInput
    ) {
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args("assignStudentsToLessonInput") assignStudentsToLessonInput: AssignStudentsToLessonInput 
    ) {
        const { lessonId, studentIds } = assignStudentsToLessonInput
        return this.lessonService.assignStudentsToLesson(lessonId, studentIds)
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return this.studentService.getStudentsByIds(lesson.students)
    }
}