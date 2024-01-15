import { QuestionRepository } from '../repositories/question-repository';
import { Question } from '../../enterprise/entities/question';
import { AnswerRepository } from '../repositories/answer-repository';
import { Either, left, right } from '@/core/types/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface ChoseQuestionBestAnswerRequest {
	authorId: string,
	answerId: string,
}

type ChoseQuestionBestAnswerResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{ question: Question }
>

export class ChoseQuestionBestAnswer {
	constructor(
		private questionRepository: QuestionRepository,
		private answerRepository: AnswerRepository
	) { }

	async execute({
		authorId,
		answerId,
	}: ChoseQuestionBestAnswerRequest): Promise<ChoseQuestionBestAnswerResponse> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError())
		}

		const question = await this.questionRepository.findById(answer.questionId.toString());

		if (!question) {
			return left(new ResourceNotFoundError())
		}

		if (question.authorId.toString() != authorId) {
			return left(new NotAllowedError())
		}

		question.bestAnswerId = answer.id;

		await this.questionRepository.save(question);

		return right({
			question
		})
	}
}