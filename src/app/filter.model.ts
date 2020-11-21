import { TodoItemData } from './dataTypes/TodoItemData';
import { TodoListData } from './dataTypes/TodoListData';

export enum Filter {
	ALL = 'SHOW_ALL', ACTIVE = 'SHOW_ACTIVE', COMPLETED = 'SHOW_COMPLETED'
}

export class FilterUtil {
	static fromString(filter: string): Filter {
		switch (filter) {
			case 'completed':
				return Filter.COMPLETED;
			case 'active':
				return Filter.ACTIVE;
			case 'all':
			default:
				return Filter.ALL;
		}
	}

	static accepts(todo: TodoItemData, filter?: Filter): boolean {
		switch (filter) {
			case Filter.ACTIVE:
				return !todo.isDone;
			case Filter.COMPLETED:
				return todo.isDone;
			case Filter.ALL:
			default:
				return true;
		}
	}
}