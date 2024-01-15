import { Either, left, right } from '@/core/types/either'
import { AnswerCommentRepository } from '../repositories/answer-comment-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteCommentOnAnswerUseCaseRequest {
    commentId: string,
    authorId: string
}

type DeleteCommentOnAnswerUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {}
>

export class DeleteCommentOnAnswerUseCase {
    constructor(private answerCommentRepository: AnswerCommentRepository) { }

    async execute({
        commentId,
        authorId
    }: DeleteCommentOnAnswerUseCaseRequest): Promise<DeleteCommentOnAnswerUseCaseResponse> {
        const comment = await this.answerCommentRepository.findById(commentId)

        if (!comment) {
            return left(new ResourceNotFoundError())
        }

        if (comment.authorId.toString() != authorId) {
            return left(new NotAllowedError())
        }

        await this.answerCommentRepository.delete(comment)

        return right({})
    }
}