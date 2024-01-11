import { QuestionRepository } from '../repositories/question-repository';

interface deleteQuestionUseCaseRequest {
	authorId: string,
	questionId: string
}

interface deleteQuestionUseCaseResponse { }

export class DeleteQuestionUseCase {
	constructor(private questionRepository: QuestionRepository) { }

	async execute({
		authorId,
		questionId
	}: deleteQuestionUseCaseRequest): Promise<deleteQuestionUseCaseResponse> {
		const question = await this.questionRepository.findById(questionId);

		if (!question) {
			throw new Error('Question not found');
		}

		if (authorId != question.authorId.toString()) {
			throw new Error('Not Allowed');
		}

		await this.questionRepository.delete(question);

		return {};
	}
}