import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionComment } from '../../enterprise/entities/question-comments';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';
import { QuestionRepository } from '../repositories/question-repository';

interface CommentOnQuestionUseCaseRequest {
    authorId: string,
    questionId: string,
    content: string,
}

interface CommentOnQuestionUseCaseResponse {
    questionComment: QuestionComment
}

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
            throw new Error('Question not found')
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityID(authorId),
            questionId: new UniqueEntityID(questionId),
            content,
        })

        await this.questionComment.create(questionComment)

        return {
            questionComment
        }
    }
}