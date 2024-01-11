import { Question } from '@/domain/forum/enterprise/entities/question';
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository';

interface GetQuestionBySlugUseCaseRequest {
	slug: string
}

interface GetQuestionBySlugUseCaseResponse {
	question: Question
}

export class GetQuestionBySlugUseCase {
	constructor(private questionsRepository: InMemoryQuestionsRepository) { }

	async execute({
		slug,
	}: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
		const question = await this.questionsRepository.findBySlug(slug);

		if (!question) {
			throw new Error('Question not found.');
		}

		return {
			question,
		};
	}
}