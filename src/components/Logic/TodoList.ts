import { observable, computed } from 'mobx';

export class TodoList {
    
    @observable todos: any;

    @computed get unfinishedTodoCount() {
        return this.todos.filter((todo: any) => !todo.is_completed).length;
    }

    @computed get completedTodosCount() {
        return this.todos.filter((todo: any) => todo.is_completed).length;
    }

    addTodo(task: any) {
        this.todos.push(task);
    }

    deleteTodo(ids: any) {
        let todos = this.todos.filter((todo: any) => {
            return ids.indexOf(todo.id) == -1;
        });

        this.todos = todos;
    }
}

