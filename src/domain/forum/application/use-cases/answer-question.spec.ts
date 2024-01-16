import { InMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answer-attachment-repository';
import { AnswerQuestionUseCase } from './answer-question';
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: AnswerQuestionUseCase;

describe('Answer Question Use Case', () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
		inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
	});

	it('should be able to create an asnwer', async () => {

		const result = await sut.execute({
			instructorId: '1',
			questionId: '1',
			content: 'New answer',
			attachmentsIds: ['1', '2']
		});

		expect(result.isRight()).toEqual(true);
		expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
		expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toHaveLength(2)
	});
});
