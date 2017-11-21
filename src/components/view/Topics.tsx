import * as React from 'react';
import { observer } from 'mobx-react';
import * as firebase from "firebase";

import { TodoList } from "../logic/TodoList";
import { AddTodo } from "../view/todo/AddTodo";
import { TodoListView } from "../view/todo/TodoList";
import { Confirmation } from "../view/todo/Confirmation";

import AddIcon from 'material-ui-icons/Add';
import { TextField, Button, Grid } from 'material-ui';

//// Props and States /////////////////////////////////////////////////////////////////////

export interface TopicsState { db: any, is_add_todo: boolean, is_open_confirmation: boolean, selected_id: number }
export interface TopicsProps extends React.Props<Topics> { url: string }

//// Class ///////////////////////////////////////////////////////////////////////////////

const store = new TodoList();
store.todos = [];

@observer
export class Topics extends React.Component<TopicsProps, TopicsState> {

    constructor(props: TopicsProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): TopicsState {

        // Initialize Firebase
        if (firebase.apps.length === 0) {
            let config = {
                apiKey: "AIzaSyCWXI6_L5CNH2dRDKtlI73GR_hdToxnxSw",
                authDomain: "todo-3640d.firebaseapp.com",
                databaseURL: "https://todo-3640d.firebaseio.com",
                projectId: "todo-3640d",
                storageBucket: "",
                messagingSenderId: "269458430363"
            };
            firebase.initializeApp(config);
        }

        let firebaseRef = firebase.database().ref('todos');

        return { db: firebaseRef, is_add_todo: false, is_open_confirmation: false, selected_id: 0 }
    }

    componentDidMount() {
        this.fetchTodo();
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    You have {store.todos.length} tasks to do today.
                </Grid>
                <Grid item xs={12}>
                    <TodoListView todos={store.todos} url={this.props.url} handleDelete={this.deleteTodo.bind(this)} handleEdit={this.editTodo} />
                </Grid>

                <Button fab color="primary" className="btnAdd" onClick={this.handleOpenDialog.bind(this)}>
                    <AddIcon className="iconAdd" />
                </Button>

                <AddTodo open={this.state.is_add_todo} handleClose={this.handleCloseDialog.bind(this)} />
                <Confirmation open={this.state.is_open_confirmation} handleClose={this.closeConfirmation.bind(this)} />
            </Grid>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

    async fetchTodo() {

        // Read data once
        let todos = await this.state.db.once('value').then(function (snapshot) {
            return snapshot.val();
        });
        todos = todos.filter((todo: any) => {
            if (todo) return todo;
        });

        store.todos = todos;
    }

    handleOpenDialog() {
        this.setState({ is_add_todo: true });
    };

    handleCloseDialog(task: string) {

        if (task && task.trim().length > 0) {

            let incNumb = !store.todos ? 1 : store.todos.length + 1;

            firebase.database().ref('todos/' + incNumb).set({
                id: incNumb,
                task: task,
                is_completed: false
            });

            this.fetchTodo();
        }

        this.setState({ is_add_todo: false });
    };

    openConfirmation(id: number) {
        this.setState({ is_add_todo: false, is_open_confirmation: true, selected_id: id });
    }

    closeConfirmation(is_confirm: boolean) {
        
        if (is_confirm && this.state.selected_id > 0) {
            this.state.db.child(this.state.selected_id).remove();
            this.fetchTodo();
        }

        this.setState({ is_add_todo: false, is_open_confirmation: false, selected_id: 0 });
    }

    deleteTodo(id: number) {
        this.openConfirmation(id);
    }

    editTodo(id: number) {
        
    }
}