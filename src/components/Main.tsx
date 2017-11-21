import * as React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Link, HashRouter } from 'react-router-dom';

import { Header } from './view/Header';
import { Navigation } from './view/Navigation';
import { Home } from './view/Home';

import { Trading } from './view/Trading';
import { Topics } from './view/Topics';
import { EditTodo } from "./view/todo/EditTodo";

//// Props and States /////////////////////////////////////////////////////////////////////

export interface MainState { }
export interface MainProps extends React.Props<Main> { }

//// Class ///////////////////////////////////////////////////////////////////////////////

@observer
export class Main extends React.Component<MainProps, MainState> {

    constructor(props: MainProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): MainState {
        return {}
    }

    componentDidMount() {
        //console.log("Main::componentDidMount() ");
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {

        const PageHome = () => (<Home />);
        const PageTopics = ({match}) => (<Topics url={match.url}/>);
        const PageTrading = () => (<Trading />);
        const Topic = ({ match }) => (<EditTodo id={match.params.topicId} />);
        
        return (
            <HashRouter>
                <div className="component-app">
                    <Header />
                    <Navigation />

                    <div className="main-content">
                        <Route exact path="/" component={PageHome} />
                        <Route exact path="/trading" component={PageTrading} />
                        <Route exact path="/topics" component={PageTopics} />
                        <Route path={`/topics/:topicId`} component={Topic}/>
                    </div>
                </div>
            </HashRouter>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////
}

// export function insertTrans(transactions: any, firebase: any) {

//     // Initialize Firebase
//     if (firebase.apps.length === 0) {
//         let config = {
//             apiKey: "AIzaSyCWXI6_L5CNH2dRDKtlI73GR_hdToxnxSw",
//             authDomain: "todo-3640d.firebaseapp.com",
//             databaseURL: "https://todo-3640d.firebaseio.com",
//             projectId: "todo-3640d",
//             storageBucket: "",
//             messagingSenderId: "269458430363"
//         };
//         firebase.initializeApp(config);
//     }

//     let cnt = 1;
//     transactions.map((trans) => {
//         console.log(cnt);
//         console.log(trans);

//         firebase.database().ref('trading/' + cnt).set(trans);
//         cnt++;
//     })
// }