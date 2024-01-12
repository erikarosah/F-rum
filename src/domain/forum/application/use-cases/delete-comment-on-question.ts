import { QuestionCommentRepository } from '../repositories/question-comments-repository';

interface DeleteCommentOnQuestionUseCaseRequest {
    commentId: string,
    authorId: string
}

interface DeleteCommentOnQuestionUseCaseResponse { }

export class DeleteCommentOnQuestionUseCase {
    constructor(private questionCommentRepository: QuestionCommentRepository) { }

    async execute({
        commentId,
        authorId
    }: DeleteCommentOnQuestionUseCaseRequest): Promise<DeleteCommentOnQuestionUseCaseResponse> {
        const comment = await this.questionCommentRepository.findById(commentId)

        if (!comment) {
            throw new Error('Comment not found')
        }

        if (comment.authorId.toString() != authorId) {
            throw new Error('Not allowed')
        }

        await this.questionCommentRepository.delete(comment)

        return {}
    }
}