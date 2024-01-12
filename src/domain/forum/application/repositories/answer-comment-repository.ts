import { AnswerComment } from '../../enterprise/entities/answer-comments';

export interface AnswerCommentRepository {
    create(answerComment: AnswerComment): Promise<void>
}