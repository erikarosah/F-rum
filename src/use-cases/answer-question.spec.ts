import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../entities/answer'

const fakeAnswerRepository: AnswerRepository = {
    create: async (answer: Answer) => {
        return
    }
}

test('create an asnwer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

    const asnwer = await answerQuestion.execute({
        instructorId: '1',
        questionId: '1',
        content: 'New answer'
    })

    expect(asnwer.content).toEqual('New answer')
})