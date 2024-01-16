import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository';
import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionAttachmentsRepository } from '@/test/repositories/in-memory-question-attachment-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: CreateQuestionUseCase;

describe('Create Question Use Case', async () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});

	it('should be able to create a question', async () => {
		const result = await sut.execute({
			title: 'Some title',
			content: 'Some content',
			authorId: '1',
			attachmentsIds: ['1', '2']
		});

		expect(result.isRight()).toBe(true)
		expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
		expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toHaveLength(2)

	});
});