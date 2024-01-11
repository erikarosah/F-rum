import { QuestionRepository } from '../repositories/question-repository';

interface EditAnswerUseCaseRequest {
	questionId: string,
	authorId: string,
	content: string
}

interface EditAnswerUseCaseResponse { }

export class EditAnswerUseCase {
	constructor(private questionRepository: QuestionRepository) { }

	async execute({
		questionId,
		authorId,
		content
	}: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
		const question = await this.questionRepository.findById(questionId);

		if (!question) {
			throw new Error('Question Not Found');
		}

		if (authorId != question?.authorId.toString()) {
			throw new Error('Not Allowed');
		}

		question.content = content;

		return {};
	}
}