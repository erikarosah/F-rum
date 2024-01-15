import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswers } from './fetch-question-answers'
import { makeQuestion } from '@/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '@/factories/make-answer'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswers

describe('Fetch Question Answers Use Case', () => {
    beforeEach(() => {
        inMemoryAnswerRepository = new InMemoryAnswersRepository()
        sut = new FetchQuestionAnswers(inMemoryAnswerRepository)
    })

    it('should be able to fetch answers', async () => {
        makeQuestion({}, new UniqueEntityID('1'))

        for (let i = 1; i <= 3; i++) {
            inMemoryAnswerRepository.create(
                makeAnswer({
                    questionId: new UniqueEntityID('1'),
                })
            )
        }

        const result = await sut.execute({
            page: 1,
            questionId: '1'
        })

        expect(result.value?.answers).toHaveLength(3)
    })

    it('should not be able to fetch answers if not exists', async () => {
        makeQuestion({}, new UniqueEntityID('1'))

        const result = await sut.execute({
            page: 1,
            questionId: '1'
        })

        expect(result.value?.answers).toHaveLength(0)
    })

    it('should not be able to fetch pagination answers', async () => {
        for (let i = 1; i <= 22; i++) {
            inMemoryAnswerRepository.create(
                makeAnswer({
                    questionId: new UniqueEntityID('1'),
                })
            )
        }

        const result = await sut.execute({
            page: 2,
            questionId: '1'
        })

        expect(result.value?.answers).toHaveLength(2)
    })
})