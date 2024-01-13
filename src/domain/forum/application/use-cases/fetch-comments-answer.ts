import { AnswerComment } from '../../enterprise/entities/answer-comments'
import { AnswerCommentRepository } from '../repositories/answer-comment-repository'


interface FetchCommentsAnswerRequest {
    answerId: string,
    page: number
}

interface FetchCommentsAnswerResponse {
    commentsAnswer: AnswerComment[]
}

export class FetchCommentsAnswerUseCase {
    constructor(private AnswerCommentRepository: AnswerCommentRepository) { }

    async execute({
        answerId,
        page
    }: FetchCommentsAnswerRequest): Promise<FetchCommentsAnswerResponse> {
        const commentsAnswer = await this.AnswerCommentRepository.findManyByAnswerId({ page }, answerId)

        if (commentsAnswer.length === 0) {
            throw new Error('Comments not found')
        }

        return {
            commentsAnswer
        }
    }
}