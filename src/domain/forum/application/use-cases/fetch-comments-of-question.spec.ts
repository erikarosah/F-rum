import { InMemoryQuestionCommentRepository } from '@/test/repositories/in-memory-question-comment-repository'
import { makeQuestionComment } from '@/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchCommentsOfQuestionUseCase } from './fetch-comments-of-question'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: FetchCommentsOfQuestionUseCase

describe('Fetch Comments Of Question Use Case', () => {
    beforeEach(() => {
        inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
        sut = new FetchCommentsOfQuestionUseCase(inMemoryQuestionCommentRepository)
    })

    it('should be able to fetch all comments on question', async () => {
        for (let i = 1; i <= 22; i++) {
            inMemoryQuestionCommentRepository.create(
                makeQuestionComment({
                    questionId: new UniqueEntityID('1')
                })
            )
        }

        const result = await sut.execute({
            page: 2,
            questionId: '1',
        })

        expect(result.isRight()).toBe(true)
        expect(result.value?.commentsOfQuestion).toHaveLength(2)
    })

    it('should not be able to fetch comments on question if not exists', async () => {
        const result = await sut.execute({
            questionId: '2',
            page: 1
        })

        expect(result.value?.commentsOfQuestion).toHaveLength(0)
    })
})