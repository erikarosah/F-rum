import { Either, left, right } from '@/core/types/either';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';

interface DeleteCommentOnQuestionUseCaseRequest {
    commentId: string,
    authorId: string
}

type DeleteCommentOnQuestionUseCaseResponse = Either<string, {}>

export class DeleteCommentOnQuestionUseCase {
    constructor(private questionCommentRepository: QuestionCommentRepository) { }

    async execute({
        commentId,
        authorId
    }: DeleteCommentOnQuestionUseCaseRequest): Promise<DeleteCommentOnQuestionUseCaseResponse> {
        const comment = await this.questionCommentRepository.findById(commentId)

        if (!comment) {
            return left('Comment not found')
        }

        if (comment.authorId.toString() != authorId) {
            return left('Not allowed')
        }

        await this.questionCommentRepository.delete(comment)

        return right({})
    }
}