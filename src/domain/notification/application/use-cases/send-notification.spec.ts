import { InMemoryNotificationRepository } from '@/test/repositories/in-memory-notification-repository'
import { SendNotificationUseCase } from './send-notification'

let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase

describe('Send Notification Use Case', () => {
    beforeEach(() => {
        inMemoryNotificationRepository = new InMemoryNotificationRepository()
        sut = new SendNotificationUseCase(inMemoryNotificationRepository)
    })

    it('should be able to create a notification', async () => {
        const result = await sut.execute({
            content: 'some-content',
            title: 'some-title',
            recipientId: '1'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryNotificationRepository.items[0]).toEqual(result.value?.notification)
        expect(inMemoryNotificationRepository.items).toHaveLength(1)
    })
})