import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerComment } from '../../enterprise/entities/answer-comments';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';
import { AnswerRepository } from '../repositories/answer-repository';
import { Either, left, right } from '@/core/types/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

export interface CommentOnAnswerUseCaseRequest {
    authorId: string,
    answerId: string,
    content: string
}

type CommentOnAnswerUseCaseResponse = Either<
    ResourceNotFoundError,
    { answerComment: AnswerComment }
>

export class CommentOnAnswerUseCase {
    constructor(
        private answerRepository: AnswerRepository,
        private answerComment: AnswerCommentRepository
    ) { }

    async execute({
        authorId,
        answerId,
        content
    }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityID(authorId),
            answerId: new UniqueEntityID(answerId),
            content
        })

        await this.answerComment.create(answerComment)

        return right({
            answerComment
        })
    }
}