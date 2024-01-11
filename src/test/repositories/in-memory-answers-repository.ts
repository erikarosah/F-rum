import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository {
    public items: Answer[] = []

    async create(answer: Answer){
        this.items.push(answer)
    }

    async findById(id: string) {
        const answer = this.items.find((item) => item.id.toString() === id)
    
        if (!answer) {
          return null
        }
    
        return answer
      }
  
}