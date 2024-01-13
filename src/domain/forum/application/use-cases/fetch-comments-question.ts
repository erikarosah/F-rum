import { QuestionComment } from '../../enterprise/entities/question-comments';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';

interface FetchCommentsQuestionRequest {
    questionId: string,
    page: number
}

interface FetchCommentsQuestionResponse {
    commentsQuestion: QuestionComment[]
}

export class FetchCommentsQuestion {
    constructor(private questionCommentRepository: QuestionCommentRepository) { }

    async execute({
        questionId,
        page
    }: FetchCommentsQuestionRequest): Promise<FetchCommentsQuestionResponse> {
        const commentsQuestion = await this.questionCommentRepository.findManyByQuestionId({ page }, questionId)

        if (commentsQuestion.length === 0) {
            throw new Error('Comments not found')
        }

        return {
            commentsQuestion
        }
    }
}