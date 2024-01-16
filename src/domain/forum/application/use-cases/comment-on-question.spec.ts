import { InMemoryQuestionCommentRepository } from '@/test/repositories/in-memory-question-comment-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { makeQuestion } from '@/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionAttachmentsRepository } from '@/test/repositories/in-memory-question-attachment-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question Use Case', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
        inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
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