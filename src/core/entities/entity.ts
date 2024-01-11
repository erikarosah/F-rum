import { UniqueEntityID } from './unique-entity-id';

export class Entity<T> {
	private _id: UniqueEntityID;
	protected props: T;

	get id() {
		return this._id;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected constructor(props: any, id?: UniqueEntityID) {
		this.props = props;
		this._id = id ?? new UniqueEntityID();
	}
}