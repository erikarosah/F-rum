import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository';
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository';
import { ChoseQuestionBestAnswer } from './chose-question-best-answer';
import { makeQuestion } from '@/test/factories/make-question';
import { makeAnswer } from '@/test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed-error';
import { InMemoryQuestionAttachmentsRepository } from '@/test/repositories/in-memory-question-attachment-repository';
import { InMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answer-attachment-repository';


let inMemoryquestionRepository: InMemoryQuestionsRepository;
let inMemoryAnswerRepository: InMemoryAnswersRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: ChoseQuestionBestAnswer;

describe('Chose Question Best Answer Use Case', () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
		inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
		inMemoryAnswerRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
		inMemoryquestionRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
		sut = new ChoseQuestionBestAnswer(inMemoryquestionRepository, inMemoryAnswerRepository);
	});

	it('should be able to choose the question best answer', async () => {
		const question = makeQuestion();
		const answer = makeAnswer({
			questionId: question.id
		});

		await inMemoryquestionRepository.create(question);
		await inMemoryAnswerRepository.create(answer);

		await sut.execute({
			answerId: answer.id.toString(),
			authorId: question.authorId.toString()
		});

		expect(inMemoryquestionRepository.items[0].bestAnswerId).toEqual(answer.id);
	});

	it('should not be able to choose another user question best answer', async () => {
		const question = makeQuestion({
			authorId: new UniqueEntityID('author-1')
		});
		const answer = makeAnswer({
			questionId: question.id
		});

		await inMemoryquestionRepository.create(question);
		await inMemoryAnswerRepository.create(answer);

		const result = await sut.execute({
			answerId: answer.id.toString(),
			authorId: 'author-2'
		})

		expect(result.isLeft()).toBe(true)
		expect(result.value).toBeInstanceOf(NotAllowedError)
	});
});