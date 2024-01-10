import { makeQuestion } from "@/factories/make-question"
import { EditAnswerUseCase } from "./edit-answer"
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: EditAnswerUseCase

describe('Edit Answer Use Case', () => {
    beforeEach(() => {
        inMemoryQuestionRepository = new InMemoryQuestionsRepository()
        sut = new EditAnswerUseCase(inMemoryQuestionRepository)
    })

    it('should be able to edit an answer', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        },
            new UniqueEntityID('1')
        )

        await inMemoryQuestionRepository.create(question)

        await sut.execute({
            authorId: 'author-1',
            questionId: '1',
            content: 'Some new content'
        })

        expect(inMemoryQuestionRepository.items[0]).toMatchObject({
            content: 'Some new content'
        })
    })

    it('should not be able to edit an answer from another user', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        },
            new UniqueEntityID('1')
        )

        await inMemoryQuestionRepository.create(question)

        await expect(() => 
            sut.execute({
                authorId: 'author-2',
                questionId: '1',
                content: 'Some new content'
            })
        ).rejects.toBeInstanceOf(Error)
    })
})