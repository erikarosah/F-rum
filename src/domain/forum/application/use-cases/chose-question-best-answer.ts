import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionRepository } from "../repositories/question-repository";
import { Question } from "../../enterprise/entities/question";
import { AnswerRepository } from "../repositories/answer-repository";

interface ChoseQuestionBestAnswerRequest {
    authorId: string,
    answerId: string,
}

interface ChoseQuestionBestAnswerResponse {
    question: Question
}

export class ChoseQuestionBestAnswer {
    constructor(
        private questionRepository: QuestionRepository,
        private answerRepository: AnswerRepository
    ) {}

    async execute({
        authorId,
        answerId,
    }: ChoseQuestionBestAnswerRequest): Promise<ChoseQuestionBestAnswerResponse> {
        const answer = await this.answerRepository.findById(answerId)

        if(!answer) {
            throw new Error('Answer not found')
        }

        const question = await this.questionRepository.findById(answer.questionId.toString())

        if(!question) {
            throw new Error('Question not found')
        }

        if(question.authorId.toString() != authorId) {
            throw new Error('Not allowed')
        }

        question.bestAnswerId = answer.id

        await this.questionRepository.save(question)

        return {
            question
        }
    }
}