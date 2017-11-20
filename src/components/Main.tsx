import * as React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Header } from './view/Header';
import { Navigation } from './view/Navigation';
import { Home } from './view/Home';
import { Trading } from './view/Trading';
import { Topics } from './view/Topics';
import { Transactions } from './logic/Transactions';

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

        const PageHome = () => (
            <Home />
        );

        const PageTopics = () => (
            <Topics />
        );

        const store = new Transactions()
        store.transactions = require('../storage/data.json')
        const PageTrading = () => (
            <Trading store={store} />
        );

        return (
            <div className="component-app">
                <Header />
                {/* <Router>
                    <div>
                        <Navigation />

                        <div className="main-content">
                            <Route exact path="/" component={PageHome} />
                            <Route exact path="/trading" component={PageTrading} />
                            <Route exact path="/topics" component={PageTopics} />
                        </div>
                    </div>
                </Router> */}

                <Navigation />
                <div className="main-content">
                    <Topics />
                </div>
            </div>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////
}