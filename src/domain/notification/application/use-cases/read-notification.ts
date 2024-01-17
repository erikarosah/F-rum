import { Either, left, right } from '@/core/types/either';
import { NotificationRepository } from '../repositories/notification-repository';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error';
import { Notification } from '../../enterprise/entities/notification';

interface ReadNotificationUseCaseRequest {
    recipientId: string,
    notificationId: string
}

type ReadNotificationUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    { notification: Notification }
>

export class ReadNotificationUseCase {
    constructor(private notificationRepository: NotificationRepository) { }

    async execute({
        notificationId,
        recipientId
    }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
        const notification = await this.notificationRepository.findById(notificationId)

        if (!notification) {
            return left(new ResourceNotFoundError())
        }

        if (notification.recipientId.toString() != recipientId) {
            return left(new NotAllowedError())
        }

        notification.read()

        await this.notificationRepository.save(notification)

        return right({
            notification
        })
    }
}