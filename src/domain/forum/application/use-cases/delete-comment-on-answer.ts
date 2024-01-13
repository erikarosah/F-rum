import { AnswerCommentRepository } from '../repositories/answer-comment-repository'

interface DeleteCommentOnAnswerUseCaseRequest {
    commentId: string,
    authorId: string
}

interface DeleteCommentOnAnswerUseCaseResponse { }

export class DeleteCommentOnAnswerUseCase {
    constructor(private answerCommentRepository: AnswerCommentRepository) { }

    async execute({
        commentId,
        authorId
    }: DeleteCommentOnAnswerUseCaseRequest): Promise<DeleteCommentOnAnswerUseCaseResponse> {
        const comment = await this.answerCommentRepository.findById(commentId)

        if (!comment) {
            throw new Error('Comment not found')
        }

        if (comment.authorId.toString() != authorId) {
            throw new Error('Not allowed')
        }

        await this.answerCommentRepository.delete(comment)

        return {}
    }
}