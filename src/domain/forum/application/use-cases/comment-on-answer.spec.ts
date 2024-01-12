import { InMemoryAnswerCommentRepository } from '@/test/repositories/in-memory-answer-comment-repository'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { makeAnswer } from '@/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comments'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe('Comment On Answer Use Case', () => {
    beforeEach(() => {
        inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentRepository)
    })

    it('should be able to comment on answer', async () => {
        const answer = makeAnswer({}, new UniqueEntityID('1'))

        const answerComment = AnswerComment.create({
            answerId: new UniqueEntityID(answer.id.toString()),
            authorId: new UniqueEntityID(),
            content: 'some content answer comment'
        })

        await inMemoryAnswerCommentRepository.create(answerComment)

        expect(inMemoryAnswerCommentRepository.Items[0].content).toEqual('some content answer comment')
    })

})