import { Either, left, right } from '@/core/types/either';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { AnswerRepository } from '../repositories/answer-repository';
import { Answer } from '../../enterprise/entities/answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerAttachmentRepository } from '../repositories/answer-attachment-repository';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list';
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment';

interface EditAnswerUseCaseRequest {
	answerId: string,
	authorId: string,
	content: string,
	attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		answer: Answer
	}
>

export class EditAnswerUseCase {
	constructor(
		private answerRepository: AnswerRepository,
		private answerAttachmentRepository: AnswerAttachmentRepository
	) { }

	async execute({
		answerId,
		authorId,
		content,
		attachmentsIds
	}: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError())
		}

		if (authorId != answer.authorId.toString()) {
			return left(new NotAllowedError())
		}

		const currentAnswerAttachments =
			await this.answerAttachmentRepository.findManyByAnswerId(answerId)

		const answerAttachmentList = new AnswerAttachmentList(
			currentAnswerAttachments,
		)

		const answerAttachments = attachmentsIds.map((attachmentId) => {
			return AnswerAttachment.create({
				attachmentId: new UniqueEntityID(attachmentId),
				answerId: answer.id,
			})
		})

		answerAttachmentList.update(answerAttachments)

		answer.attachments = answerAttachmentList

		answer.content = content;

		return right({
			answer
		});
	}
}