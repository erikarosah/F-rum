import { makeQuestion } from '@/factories/make-question';
import { EditAnswerUseCase } from './edit-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed-error';
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository';
import { InMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answer-attachment-repository';
import { makeAnswer } from '@/factories/make-answer';
import { makeAnswerAttachment } from '@/factories/make-answer-attachment';

let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentsRepository
let sut: EditAnswerUseCase;

describe('Edit Answer Use Case', () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentsRepository()
		inMemoryAnswerRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentRepository)
		sut = new EditAnswerUseCase(inMemoryAnswerRepository, inMemoryAnswerAttachmentRepository)
	});

	it('should be able to edit an answer', async () => {
		const newAnswer = makeAnswer(
			{
				authorId: new UniqueEntityID('author-1')
			},
			new UniqueEntityID('answer-1')
		)

		await inMemoryAnswerRepository.create(newAnswer)

		inMemoryAnswerAttachmentRepository.items.push(
			makeAnswerAttachment({
				answerId: newAnswer.id,
				attachmentId: new UniqueEntityID('1')
			}),
			makeAnswerAttachment({
				answerId: newAnswer.id,
				attachmentId: new UniqueEntityID('2')
			})
		)

		await sut.execute({
			answerId: newAnswer.id.toString(),
			authorId: 'author-1',
			content: 'some content',
			attachmentsIds: ['1', '3']
		})

		expect(inMemoryAnswerRepository.items[0]).toMatchObject({
			content: 'some content'
		})
		expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toHaveLength(2)
	});

	it('should not be able to edit an answer from another user', async () => {
		const answer = makeAnswer({
			authorId: new UniqueEntityID('author-1')
		},
			new UniqueEntityID('1')
		);

		await inMemoryAnswerRepository.create(answer);

		const result = await sut.execute({
			authorId: 'author-2',
			answerId: '1',
			content: 'Some new content',
			attachmentsIds: []
		})

		expect(result.isLeft()).toBe(true)
		expect(result.value).toBeInstanceOf(NotAllowedError)
	});
});