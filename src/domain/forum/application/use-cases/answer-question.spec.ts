import { AnswerQuestionUseCase } from './answer-question';
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Answer Question Use Case', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
	});

	it('ahould be able to create an asnwer', async () => {

		const { answer } = await sut.execute({
			instructorId: '1',
			questionId: '1',
			content: 'New answer'
		});

		expect(answer.content).toEqual('New answer');
		expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);
	});
});
