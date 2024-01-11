import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository';
import { CreateQuestionUseCase } from './create-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('Create Question Use Case', async () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});

	it('should be able to create a question', async () => {
		const { question } = await sut.execute({
			title: 'Some title',
			content: 'Some content',
			authorId: '1'
		});

		expect(question.id).toBeTruthy();
		expect(question.title).toEqual('Some title');
		expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id);

	});
});