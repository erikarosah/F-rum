import { AnswerComment } from '../../enterprise/entities/answer-comments';

export interface AnswerCommentRepository {
    create(answerComment: AnswerComment): Promise<void>
    delete(questionComment: AnswerComment): Promise<void>
    findById(id: string): Promise<AnswerComment | null>
}