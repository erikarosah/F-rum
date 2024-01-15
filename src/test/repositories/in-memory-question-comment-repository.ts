import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comments';

export class InMemoryQuestionCommentRepository implements QuestionCommentRepository {
    public items: QuestionComment[] = [];

    async create(questionComment: QuestionComment) {
        this.items.push(questionComment)
    }

    async delete(questionComment: QuestionComment) {
        const itemIndex = this.items.findIndex((item) => item.id === questionComment.questionId)
        this.items.splice(itemIndex, 1)
    }

    async findById(id: string) {
        const commentQuestion = this.items.find((item) => item.id.toString() === id);

        if (!commentQuestion) {
            return null;
        }

        return commentQuestion;
    }

    async findManyByQuestionId({ page }: PaginationParams, id: string,) {
        const commentsQuestion = this.items.filter((item) => item.questionId.toString() === id)
            .slice((page - 1) * 20, page * 20)

        return commentsQuestion;
    }

    async findBySlug(slug: string) {
        const question = this.items.find((item) => item.slug.value === slug);

        if (!question) {
            return null;
        }

        return question;
    }
}