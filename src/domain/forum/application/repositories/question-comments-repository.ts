import { QuestionComment } from '../../enterprise/entities/question-comments';

export interface QuestionCommentRepository {
    create(questionComment: QuestionComment): Promise<void>
};