import * as React from 'react';

import { Button } from 'material-ui';
import DeleteIcon from 'material-ui-icons/Delete';
import CheckIcon from 'material-ui-icons/Check';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { Card, CardHeader, CardContent, LinearProgress, Grid, Typography } from 'material-ui';

//// Props and States /////////////////////////////////////////////////////////////////////
export interface TodoListState {}
export interface TodoListProps extends React.Props<TodoListView> { todos: any, handleDelete: (id: number) => void }

//// Class ///////////////////////////////////////////////////////////////////////////////

export class TodoListView extends React.Component<TodoListProps, TodoListState> {

    constructor(props: TodoListProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): TodoListState {
        return {}
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {

        let lstTodos = null;

        if (this.props.todos && this.props.todos.length > 0) {
            lstTodos = this.props.todos.map((todo: any) => {
                if (todo && todo.task) {
                    return (
                        <TableRow key={todo.id} className={todo.is_completed ? 'task-completed' : ''}>
                            <TableCell>{todo.id}</TableCell>
                            <TableCell>{todo.task}</TableCell>
                            <TableCell>
                                {todo.is_completed ? <CheckIcon /> : ''}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => this.deleteTodo(todo.id)}>
                                    <DeleteIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                }
            });
            console.log("TodoList::render()");
            console.log(lstTodos);
        }

        return (
            <Card>
                <CardHeader title="Todos" subheader={this.props.todos.length + " tasks"} />
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Reference ID</TableCell>
                                <TableCell>Task</TableCell>
                                <TableCell>Completed</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lstTodos}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

    deleteTodo(id: number) {
        this.props.handleDelete(id);
    }
}