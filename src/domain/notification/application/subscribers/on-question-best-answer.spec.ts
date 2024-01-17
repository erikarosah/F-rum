import { SendNotificationUseCase, SendNotificationUseCaseRequest, SendNotificationUseCaseResponse } from '../use-cases/send-notification'
import { MockInstance } from 'vitest'
import { OnQuestionBestAnswerChosen } from './on-question-best-answer-chose'
import { waitFor } from '@/test/utils/wait-for'
import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryNotificationRepository } from '@/test/repositories/in-memory-notification-repository'
import { InMemoryQuestionAttachmentsRepository } from '@/test/repositories/in-memory-question-attachment-repository'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answer-attachment-repository'
import { makeAnswer } from '@/test/factories/make-answer'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationRepository: InMemoryNotificationRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
    [SendNotificationUseCaseRequest],
    Promise<SendNotificationUseCaseResponse>
>

describe('On Question Best Answer Chosen', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository =
            new InMemoryQuestionAttachmentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
            inMemoryQuestionAttachmentsRepository,
        )
        inMemoryAnswerAttachmentsRepository =
            new InMemoryAnswerAttachmentsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository(
            inMemoryAnswerAttachmentsRepository,
        )
        inMemoryNotificationRepository = new InMemoryNotificationRepository()
        sendNotificationUseCase = new SendNotificationUseCase(
            inMemoryNotificationRepository,
        )

        sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

        new OnQuestionBestAnswerChosen(
            inMemoryAnswersRepository,
            sendNotificationUseCase,
        )
    })

    it('should send a notification when topic has new best answer chosen', async () => {
        const question = makeQuestion()
        const answer = makeAnswer({ questionId: question.id })

        inMemoryQuestionsRepository.create(question)
        inMemoryAnswersRepository.create(answer)

        question.bestAnswerId = answer.id

        inMemoryQuestionsRepository.save(question)

        await waitFor(() => {
            expect(sendNotificationExecuteSpy).toHaveBeenCalled()
        })
    })
})