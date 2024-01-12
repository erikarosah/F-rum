import { QuestionComment } from '../../enterprise/entities/question-comments';

export interface QuestionCommentRepository {
    create(questionComment: QuestionComment): Promise<void>
    delete(questionComment: QuestionComment): Promise<void>
    findById(id: string): Promise<QuestionComment | null>
};