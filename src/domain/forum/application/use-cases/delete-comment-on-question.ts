import { Either, left, right } from '@/core/types/either';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface DeleteCommentOnQuestionUseCaseRequest {
    commentId: string,
    authorId: string
}

type DeleteCommentOnQuestionUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {}
>

export class DeleteCommentOnQuestionUseCase {
    constructor(private questionCommentRepository: QuestionCommentRepository) { }

    async execute({
        commentId,
        authorId
    }: DeleteCommentOnQuestionUseCaseRequest): Promise<DeleteCommentOnQuestionUseCaseResponse> {
        const comment = await this.questionCommentRepository.findById(commentId)

        if (!comment) {
            return left(new ResourceNotFoundError())
        }

        if (comment.authorId.toString() != authorId) {
            return left(new NotAllowedError())
        }

        await this.questionCommentRepository.delete(comment)

        return right({})
    }
}