import * as React from 'react';
import * as moment from 'moment';
import { Button, IconButton } from 'material-ui';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import CheckIcon from 'material-ui-icons/Check';
import { Card, CardHeader, CardContent, Grid } from 'material-ui';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import { BrowserRouter as Router, Route, Link, HashRouter } from 'react-router-dom';

//// Props and States /////////////////////////////////////////////////////////////////////
export interface TodoListState {}
export interface TodoListProps extends React.Props<TodoListView> { 
    todos: any, url: string, handleDelete: (id: number) => void, handleEdit: (id: number) => void }

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
                    let date = todo.date ? moment(todo.date).format('MMM DD YYYY') : '';

                    return (
                        <TableRow key={todo.id} className={todo.is_completed ? 'task-completed' : ''}>
                            <TableCell>{todo.id}</TableCell>
                            <TableCell>{todo.task}</TableCell>
                            <TableCell>
                                <div className="color" style={ {background: todo.color} } />
                            </TableCell>
                            <TableCell>
                                {todo.is_completed ? <CheckIcon /> : ''}
                            </TableCell>
                            <TableCell>{date}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => this.deleteTodo(todo.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                <Link to={`${this.props.url}/${todo.id}`}>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                                </Link>
                            </TableCell>
                        </TableRow>
                    );
                }
            });
            //console.log("TodoList::render()");
            //console.log(lstTodos);
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
                                <TableCell>Color</TableCell>
                                <TableCell>Completed</TableCell>
                                <TableCell>Date</TableCell>
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