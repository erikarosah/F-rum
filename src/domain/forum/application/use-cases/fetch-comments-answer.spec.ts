import { InMemoryAnswerCommentRepository } from '@/test/repositories/in-memory-answer-comment-repository'
import { FetchCommentsOfAnswerUseCase } from './fetch-comments-of-answer'
import { makeAnswerComment } from '@/factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: FetchCommentsOfAnswerUseCase

describe('Fetch Comments Of Answer Use Case', () => {
    beforeEach(() => {
        inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
        sut = new FetchCommentsOfAnswerUseCase(inMemoryAnswerCommentRepository)
    })

    it('should be able to fetch all comments on answers', async () => {
        for (let i = 1; i <= 22; i++) {
            inMemoryAnswerCommentRepository.create(
                makeAnswerComment({
                    answerId: new UniqueEntityID('1')
                })
            )
        }

        const { commentsAnswer } = await sut.execute({
            page: 2,
            answerId: '1',
        })

        expect(commentsAnswer).toHaveLength(2)
    })

    it('should not be able to fetch comments on question if not exists', async () => {
        await expect(() =>
            sut.execute({
                answerId: '2',
                page: 1
            })
        ).rejects.toBeInstanceOf(Error)
    })
})