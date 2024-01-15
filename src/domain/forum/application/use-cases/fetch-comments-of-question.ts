import { Either, left, right } from '@/core/types/either';
import { QuestionComment } from '../../enterprise/entities/question-comments';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface FetchCommentsOfQuestionRequest {
    questionId: string,
    page: number
}

type FetchCommentsOfQuestionResponse = Either<
    ResourceNotFoundError,
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

        if (commentsOfQuestion.length === 0) {
            return left(new ResourceNotFoundError())
        }

        return right({
            commentsOfQuestion
        })
    }
}