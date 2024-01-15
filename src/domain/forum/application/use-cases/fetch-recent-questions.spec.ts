import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository';
import { makeQuestion } from '@/factories/make-question';
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe('Fetch Recent Questions Use Case', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
    });

    it('should be able to fetch recent questions', async () => {
        await inMemoryQuestionsRepository.create(
            makeQuestion({
                createdAt: new Date(2024, 11, 10)
            })
        )

        await inMemoryQuestionsRepository.create(
            makeQuestion({
                createdAt: new Date(2024, 11, 20)
            })
        )

        await inMemoryQuestionsRepository.create(
            makeQuestion({
                createdAt: new Date(2024, 11, 30)
            })
        )

        const result = await sut.execute({
            page: 1
        })

        expect(result.value?.questions).toEqual([
            expect.objectContaining({ createdAt: new Date(2024, 11, 30) }),
            expect.objectContaining({ createdAt: new Date(2024, 11, 20) }),
            expect.objectContaining({ createdAt: new Date(2024, 11, 10) })
        ])
    });

    it('should be able to fetch pagination recent questions', async () => {
        for (let i = 1; i <= 22; i++) {
            await inMemoryQuestionsRepository.create(
                makeQuestion()
            )
        }

        const result = await sut.execute({
            page: 2
        })

        expect(result.value?.questions).toHaveLength(2)
    });
});