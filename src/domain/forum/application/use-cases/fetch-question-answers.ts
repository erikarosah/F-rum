import { Either, left, right } from '@/core/types/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface FetchQuestionAnswersRequest {
    page: number,
    questionId: string
}

type FetchQuestionAnswersResponse = Either<
    ResourceNotFoundError,
    { answers: Answer[] }
>


export class FetchQuestionAnswers {
    constructor(private answerRepository: AnswerRepository) { }

    async execute({
        page,
        questionId
    }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
        const answers = await this.answerRepository.findManyByQuestionId({ page }, questionId)

        if (answers.length === 0) {
            return left(new ResourceNotFoundError())
        }

        return right({
            answers
        })
    }
}