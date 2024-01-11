import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { QuestionProps } from './question';
import { CommentProps, Comment } from './comment';

export interface QuestionCommentsProps extends CommentProps {
    questionId: UniqueEntityID,
}

export class QuestionComment extends Comment<QuestionCommentsProps> {
    get questionId() {
        return this.props.questionId
    }

    static create(
        props: Optional<QuestionProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const questionComment = new QuestionComment({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);

        return questionComment;
    }

}