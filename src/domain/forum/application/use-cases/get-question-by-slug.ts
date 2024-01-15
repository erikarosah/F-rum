import { Either, left, right } from '@/core/types/either';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetQuestionBySlugUseCaseRequest {
	slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<
	ResourceNotFoundError,
	{ question: Question }
>

export class GetQuestionBySlugUseCase {
	constructor(private questionsRepository: InMemoryQuestionsRepository) { }

	async execute({
		slug,
	}: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
		const question = await this.questionsRepository.findBySlug(slug);

		if (!question) {
			return left(new ResourceNotFoundError())
		}

		return right({
			question
		})
	}
}