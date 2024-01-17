import { makeAnswer } from '@/test/factories/make-answer'
import { OnAnswerCreated } from './on-answer-created'
import { InMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answer-attachment-repository'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: InMemoryAnswersRepository

describe('On Answer Created', () => {
    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
        sut = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
    })

    it('should send a notification when an answer is created', async () => {
        const onAnswerCreated = new OnAnswerCreated()

        const answer = makeAnswer()

        sut.create(answer)
    })
})