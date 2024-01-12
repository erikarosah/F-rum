import { InMemoryQuestionCommentRepository } from '@/test/repositories/in-memory-question-comment-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { makeQuestion } from '@/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question Use Case', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
        sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionCommentRepository)
    })

    it('should be able to comment on question', async () => {
        const question = makeQuestion({}, new UniqueEntityID('1'))

        await inMemoryQuestionsRepository.create(question)

        await sut.execute({
            authorId: 'author-1',
            content: 'some content question comment',
            questionId: question.id.toString()
        })

        expect(inMemoryQuestionCommentRepository.items[0].content).toEqual('some content question comment')
    })
})