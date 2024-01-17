import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

export interface NotificationProps {
    recipientid: UniqueEntityID,
    title: string,
    content: string,
    readAt?: Date,
    createdAt: Date
}

export class Notification extends Entity<NotificationProps> {
    get recipientId() {
        return this.props.recipientid
    }

    get title() {
        return this.props.title
    }

    get content() {
        return this.props.content
    }

    get readAt() {
        return this.props.readAt
    }

    get createdAt() {
        return this.props.createdAt
    }

    set content(value: string) {
        this.content = value
    }

    static create(props: Optional<NotificationProps, 'createdAt'>, id?: UniqueEntityID) {
        const notification = new Notification({
            ...props,
            createdAt: props.createdAt ?? new Date()
        }, id)

        return notification
    }
}