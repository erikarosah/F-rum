import { InMemoryQuestionCommentRepository } from '@/test/repositories/in-memory-question-comment-repository'
import { makeQuestionComment } from '@/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchCommentsQuestionUseCase } from './fetch-comments-question'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: FetchCommentsQuestionUseCase

describe('Fetch Comments Question Use Case', () => {
    beforeEach(() => {
        inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
        sut = new FetchCommentsQuestionUseCase(inMemoryQuestionCommentRepository)
    })

    it('should be able to fetch all comments on question', async () => {
        for (let i = 1; i <= 22; i++) {
            inMemoryQuestionCommentRepository.create(
                makeQuestionComment({
                    questionId: new UniqueEntityID('1')
                })
            )
        }

        const { commentsQuestion } = await sut.execute({
            page: 2,
            questionId: '1',
        })

        expect(commentsQuestion).toHaveLength(2)
    })

    it('should not be able to fetch comments on question if not exists', async () => {
        await expect(() =>
            sut.execute({
                questionId: '2',
                page: 1
            })
        ).rejects.toBeInstanceOf(Error)
    })
})