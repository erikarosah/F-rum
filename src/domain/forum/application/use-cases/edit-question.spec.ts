import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository';
import { EditQuestionUseCase } from './edit-question';
import { makeQuestion } from '@/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit Question Use Case', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
	});

	it('should be able to edit a question', async () => {
		const question = makeQuestion(
			{ authorId: new UniqueEntityID('author-1') },

			new UniqueEntityID('question-1')
		);

		await inMemoryQuestionsRepository.create(question);

		await sut.execute({
			authorId: 'author-1',
			title: 'Some title',
			content: 'Some content',
			questionId: question.id.toString()
		});

		expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
			title: 'Some title'
		});
	});

	it('should not be able to edit a question from another user', async () => {
		const question = makeQuestion(
			{ authorId: new UniqueEntityID('author-1') },

			new UniqueEntityID('question-1')
		);

		await inMemoryQuestionsRepository.create(question);

		await expect(() =>
			sut.execute({
				authorId: 'author-2',
				title: 'Some title',
				content: 'Some content',
				questionId: question.id.toString()
			})
		).rejects.toBeInstanceOf(Error);
	});
});