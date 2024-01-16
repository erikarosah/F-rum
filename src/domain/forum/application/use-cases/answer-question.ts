import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';
import { Either, right } from '@/core/types/either';
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list';

interface AnswerQuestionUseCaseRequest {
	instructorId: string,
	questionId: string,
	content: string,
	attachmentsIds: string[]
}

type AnswerQuestionUseCaseResponse = Either<
	null,
	{ answer: Answer }
>

export class AnswerQuestionUseCase {
	constructor(private answerRepository: AnswerRepository) { }

	async execute({
		instructorId,
		questionId,
		content,
		attachmentsIds
	}: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {

		const answer = Answer.create({
			authorId: new UniqueEntityID(instructorId),
			questionId: new UniqueEntityID(questionId),
			content
		});

		const answerAttachments = attachmentsIds.map(attachmentsIds => {
			return AnswerAttachment.create({
				attachmentId: new UniqueEntityID(attachmentsIds),
				answerId: answer.id
			})
		})

		answer.attachments = new AnswerAttachmentList(answerAttachments)

		await this.answerRepository.create(answer);

		return right({
			answer
		})

	}
}