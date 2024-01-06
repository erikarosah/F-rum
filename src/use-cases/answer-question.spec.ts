import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { e } from 'vitest/dist/reporters-qc5Smpt5'

test('create an asnwer', () => {
    const answerQuestion = new AnswerQuestionUseCase()

    const asnwer = answerQuestion.execute({
        instructorId: '1',
        questionId: '1',
        content: 'New answer'
    })

    expect(asnwer.content).toEqual('New answer')
})