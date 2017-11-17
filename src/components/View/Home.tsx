import * as React from 'react';
import { observer } from 'mobx-react';
import * as firebase from "firebase";

import { TodoList } from "../Logic/TodoList";

//// Props and States /////////////////////////////////////////////////////////////////////

export interface HomeState { db: any }
export interface HomeProps extends React.Props<Home> { }

//// Class ///////////////////////////////////////////////////////////////////////////////

const store = new TodoList();
store.todos = [];

@observer
export class Home extends React.Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): HomeState {
        
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

        return { db: firebaseRef }
    }

    componentDidMount() {
        console.log("Home::componentDidMount()");
        this.fetchTodo();
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {
        console.log("Home::render()");

        let lstTodos = null;

        if (store.todos) {
            lstTodos = store.todos.map((todo: any) => {
                return (<div>{todo.task}</div>)
            });
        }

        return (
            <div>
                Todo:
                {lstTodos}
            </div>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

    async fetchTodo() {

        // Read data once
        let todos = await this.state.db.once('value').then(function (snapshot) {
            return snapshot.val();
        });
        store.todos = todos;

        // Read data one by one
        // let todos = [];
        // firebaseRef.limitToLast(25).on('value', function (dataSnapshot: any) {
        //     dataSnapshot.forEach(function (childSnapshot: any) {
        //         var item = childSnapshot.val();
        //         console.log(item);
        //         store.addTodo(item);
        //     });
        // });
    }
}