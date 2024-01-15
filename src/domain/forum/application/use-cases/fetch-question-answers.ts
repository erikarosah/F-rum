import { Either, right } from '@/core/types/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';

interface FetchQuestionAnswersRequest {
    page: number,
    questionId: string
}

type FetchQuestionAnswersResponse = Either<
    null,
    { answers: Answer[] }
>


export class FetchQuestionAnswers {
    constructor(private answerRepository: AnswerRepository) { }

    async execute({
        page,
        questionId
    }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
        const answers = await this.answerRepository.findManyByQuestionId({ page }, questionId)

        return right({
            answers
        })
    }
}