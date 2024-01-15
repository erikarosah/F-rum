import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionComment } from '../../enterprise/entities/question-comments';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';
import { QuestionRepository } from '../repositories/question-repository';
import { Either, left, right } from '@/core/types/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface CommentOnQuestionUseCaseRequest {
    authorId: string,
    questionId: string,
    content: string,
}

type CommentOnQuestionUseCaseResponse = Either<
    ResourceNotFoundError,
    { questionComment: QuestionComment }
>

export class CommentOnQuestionUseCase {
    constructor(
        private questionRepository: QuestionRepository,
        private questionComment: QuestionCommentRepository
    ) { }

    async execute({
        authorId,
        questionId,
        content
    }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityID(authorId),
            questionId: new UniqueEntityID(questionId),
            content,
        })

        await this.questionComment.create(questionComment)

        return right({
            questionComment
        })
    }
}