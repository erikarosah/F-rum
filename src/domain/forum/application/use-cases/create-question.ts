import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionRepository } from '../repositories/question-repository';
import { Question } from '../../enterprise/entities/question';
import { Either, right } from '@/core/types/either';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';

interface CreateQuestionUseCaseRequest {
	authorId: string,
	title: string,
	content: string,
	attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<
	null,
	{ question: Question }
>

export class CreateQuestionUseCase {
	constructor(private questionRepository: QuestionRepository) { }

	async execute({
		title,
		content,
		authorId,
		attachmentsIds
	}: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
		const question = Question.create({
			title,
			content,
			authorId: new UniqueEntityID(authorId)
		});

		const questionAttachment = attachmentsIds.map(attachmentsIds => {
			return QuestionAttachment.create({
				attachmentId: new UniqueEntityID(attachmentsIds),
				questionId: question.id
			})
		})

		question.attachments = questionAttachment
		await this.questionRepository.create(question);

		return right({
			question
		})
	}
}