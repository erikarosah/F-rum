import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comments';

export class InMemoryAnswerCommentRepository implements AnswerCommentRepository {
    public Items: AnswerComment[] = []

    async create(answerComment: AnswerComment) {
        this.Items.push(answerComment)
    }

    async delete(answerComment: AnswerComment) {
        const itemIndex = this.Items.findIndex((item) => item.answerId === answerComment.answerId)
        this.Items.splice(itemIndex, 1)
    }

    async findById(id: string) {
        const commentQuestion = this.Items.find((item) => item.id.toString() === id);

        if (!commentQuestion) {
            return null;
        }

        return commentQuestion;
    }
}