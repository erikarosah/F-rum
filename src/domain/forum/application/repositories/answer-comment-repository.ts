import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerComment } from '../../enterprise/entities/answer-comments';

export interface AnswerCommentRepository {
    create(answerComment: AnswerComment): Promise<void>
    delete(questionComment: AnswerComment): Promise<void>
    findById(id: string): Promise<AnswerComment | null>
    findManyByAnswerId(params: PaginationParams, id: string): Promise<AnswerComment[]>
}