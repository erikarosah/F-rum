import { InMemoryNotificationRepository } from '@/test/repositories/in-memory-notification-repository'
import { ReadNotificationUseCase } from './read-notification'
import { makeNotification } from '@/test/factories/make-notification'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'

let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: ReadNotificationUseCase

describe('Read Notification Use Case', () => {
    beforeEach(() => {
        inMemoryNotificationRepository = new InMemoryNotificationRepository()
        sut = new ReadNotificationUseCase(inMemoryNotificationRepository)
    })

    it('should be able to read a notification', async () => {
        const notification = makeNotification()

        inMemoryNotificationRepository.create(notification)

        const result = await sut.execute({
            notificationId: notification.id.toString(),
            recipientId: notification.recipientId.toString()
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryNotificationRepository.items[0].readAt).toEqual(
            expect.any(Date)
        )
    })

    it('should not be able to read a notification from another user', async () => {
        const notification = makeNotification({}, new UniqueEntityID('author-1'))

        inMemoryNotificationRepository.create(notification)

        const result = await sut.execute({
            notificationId: notification.id.toString(),
            recipientId: 'author-2'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})