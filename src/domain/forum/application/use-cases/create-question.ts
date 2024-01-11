import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionRepository } from '../repositories/question-repository';
import { Question } from '../../enterprise/entities/question';

interface CreateQuestionUseCaseRequest {
	authorId: string,
	title: string,
	content: string
}

interface CreateQuestionUseCaseResponse {
	question: Question
}

export class CreateQuestionUseCase {
	constructor(private questionRepository: QuestionRepository) { }

	async execute({
		title,
		content,
		authorId
	}: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
		const question = Question.create({
			title,
			content,
			authorId: new UniqueEntityID(authorId)
		});

		await this.questionRepository.create(question);

		return {
			question
		};
	}
}