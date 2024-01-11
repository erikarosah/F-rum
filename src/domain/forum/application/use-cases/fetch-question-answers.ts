import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';

interface FetchQuestionAnswersRequest {
    page: number,
    questionId: string
}

interface FetchQuestionAnswersResponse {
    answers: Answer[]
}

export class FetchQuestionAnswers {
    constructor(private answerRepository: AnswerRepository) { }

    async execute({
        page,
        questionId
    }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
        const answers = await this.answerRepository.findManyByQuestionId({ page }, questionId)

        if (answers.length === 0) {
            throw new Error('Answers not found')
        }

        return {
            answers
        }
    }
}