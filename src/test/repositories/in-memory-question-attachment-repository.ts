import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository implements InMemoryQuestionAttachmentsRepository {
    public items: QuestionAttachment[] = []

    async findManyByQuestionId(questionId: string) {
        const questionAttachments = this.items.filter(
            (item) => item.questionId.toString() === questionId,
        )

        return questionAttachments
    }
}