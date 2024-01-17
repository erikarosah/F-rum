import { InMemoryAnswerCommentRepository } from '@/test/repositories/in-memory-answer-comment-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteCommentOnAnswerUseCase } from './delete-comment-on-answer'
import { makeAnswerComment } from '@/test/factories/make-answer-comment'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: DeleteCommentOnAnswerUseCase

describe('Delete Comment On Answer Use Case', () => {
    beforeEach(() => {
        inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
        sut = new DeleteCommentOnAnswerUseCase(inMemoryAnswerCommentRepository)
    })

    it('should be able to delete a comment on answer', async () => {
        const comment = makeAnswerComment()

        await inMemoryAnswerCommentRepository.create(comment)

        await sut.execute({
            commentId: comment.id.toString(),
            authorId: comment.authorId.toString()
        })

        expect(inMemoryAnswerCommentRepository.Items).toHaveLength(0)
    })

    it('should not be able to delete a comment from another user', async () => {
        const comment = makeAnswerComment({
            authorId: new UniqueEntityID('author-1')
        })

        await inMemoryAnswerCommentRepository.create(comment)

        const result = await sut.execute({
            commentId: comment.id.toString(),
            authorId: 'author-2'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})