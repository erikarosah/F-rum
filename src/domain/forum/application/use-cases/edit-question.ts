
import { Question } from '@/domain/forum/enterprise/entities/question'

import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttachmentsRepository } from '@/test/repositories/in-memory-question-attachment-repository'
import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface EditQuestionUseCaseRequest {
	authorId: string
	questionId: string
	title: string
	content: string
	attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		question: Question
	}
>

export class EditQuestionUseCase {
	constructor(
		private questionsRepository: InMemoryQuestionsRepository,
		private questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
	) { }

	async execute({
		authorId,
		questionId,
		title,
		content,
		attachmentsIds,
	}: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId)

		if (!question) {
			return left(new ResourceNotFoundError())
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedError())
		}

		const currentQuestionAttachments =
			await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

		const questionAttachmentList = new QuestionAttachmentList(
			currentQuestionAttachments,
		)

		const questionAttachments = attachmentsIds.map((attachmentId) => {
			return QuestionAttachment.create({
				attachmentId: new UniqueEntityID(attachmentId),
				questionId: question.id,
			})
		})

		questionAttachmentList.update(questionAttachments)

		question.attachments = questionAttachmentList
		question.title = title
		question.content = content

		await this.questionsRepository.save(question)

		return right({
			question,
		})
	}
}