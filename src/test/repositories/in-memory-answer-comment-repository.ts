import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comments';

export class InMemoryAnswerCommentRepository implements AnswerCommentRepository {
    public Items: AnswerComment[] = []

    async create(answerComment: AnswerComment) {
        this.Items.push(answerComment)
    }
}