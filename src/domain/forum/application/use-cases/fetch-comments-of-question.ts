import { Either, left, right } from '@/core/types/either';
import { QuestionComment } from '../../enterprise/entities/question-comments';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';

interface FetchCommentsOfQuestionRequest {
    questionId: string,
    page: number
}

type FetchCommentsOfQuestionResponse = Either<
    null,
    {
        commentsOfQuestion: QuestionComment[]
    }
>

export class FetchCommentsOfQuestionUseCase {
    constructor(private questionCommentRepository: QuestionCommentRepository) { }

    async execute({
        questionId,
        page
    }: FetchCommentsOfQuestionRequest): Promise<FetchCommentsOfQuestionResponse> {
        const commentsOfQuestion = await this.questionCommentRepository.findManyByQuestionId({ page }, questionId)

        return right({
            commentsOfQuestion
        })
    }
}