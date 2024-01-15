import { Either, left, right } from '@/core/types/either';
import { QuestionRepository } from '../repositories/question-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface deleteQuestionUseCaseRequest {
	authorId: string,
	questionId: string
}

type deleteQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{}
>

export class DeleteQuestionUseCase {
	constructor(private questionRepository: QuestionRepository) { }

	async execute({
		authorId,
		questionId
	}: deleteQuestionUseCaseRequest): Promise<deleteQuestionUseCaseResponse> {
		const question = await this.questionRepository.findById(questionId);

		if (!question) {
			return left(new ResourceNotFoundError())
		}

		if (authorId != question.authorId.toString()) {
			return left(new NotAllowedError())
		}

		await this.questionRepository.delete(question);

		return right({});
	}
}