import { Either, left, right } from '@/core/types/either'
import { AnswerComment } from '../../enterprise/entities/answer-comments'
import { AnswerCommentRepository } from '../repositories/answer-comment-repository'

interface FetchCommentsOfAnswerRequest {
    answerId: string,
    page: number
}

type FetchCommentsOfAnswerResponse = Either<
    null,
    { commentsOfAnswer: AnswerComment[] }
>

export class FetchCommentsOfAnswerUseCase {
    constructor(private AnswerCommentRepository: AnswerCommentRepository) { }

    async execute({
        answerId,
        page
    }: FetchCommentsOfAnswerRequest): Promise<FetchCommentsOfAnswerResponse> {
        const commentsOfAnswer = await this.AnswerCommentRepository.findManyByAnswerId({ page }, answerId)

        return right({
            commentsOfAnswer
        })
    }
}