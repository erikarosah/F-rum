import { InMemoryQuestionCommentRepository } from "@/test/repositories/in-memory-question-comment-repository"
import { DeleteCommentOnQuestionUseCase } from "./delete-comment-on-question"
import { makeQuestionComment } from "@/factories/make-question-comment"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: DeleteCommentOnQuestionUseCase

describe('Delete Comment On Question Use Case', () => {
    beforeEach(() => {
        inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
        sut = new DeleteCommentOnQuestionUseCase(inMemoryQuestionCommentRepository)
    })

    it('should be able to delete a comment on question', async () => {
        const comment = makeQuestionComment()

        await inMemoryQuestionCommentRepository.create(comment)

        await sut.execute({
            commentId: comment.id.toString(),
            authorId: comment.authorId.toString()
        })

        expect(inMemoryQuestionCommentRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a comment from another user', async () => {
        const comment = makeQuestionComment({
            authorId: new UniqueEntityID('author-1')
        })

        await inMemoryQuestionCommentRepository.create(comment)

        await expect(() =>
            sut.execute({
                commentId: comment.id.toString(),
                authorId: 'author-2'
            })
        ).rejects.toBeInstanceOf(Error)

    })
})