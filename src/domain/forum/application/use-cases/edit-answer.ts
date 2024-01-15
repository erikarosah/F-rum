import { Either, left, right } from '@/core/types/either';
import { QuestionRepository } from '../repositories/question-repository';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface EditAnswerUseCaseRequest {
	questionId: string,
	authorId: string,
	content: string
}

type EditAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{}
>

export class EditAnswerUseCase {
	constructor(private questionRepository: QuestionRepository) { }

	async execute({
		questionId,
		authorId,
		content
	}: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
		const question = await this.questionRepository.findById(questionId);

		if (!question) {
			return left(new ResourceNotFoundError())
		}

		if (authorId != question.authorId.toString()) {
			return left(new NotAllowedError())
		}

		question.content = content;

		return right({});
	}
}