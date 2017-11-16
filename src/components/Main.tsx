import * as React from 'react';
import { observer } from 'mobx-react';

import { Header } from './View/Header';
import { Navigation } from './View/Navigation';

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

    // componentDidMount() {
    //     console.log("Main::componentDidMount() ");
    //     this.fetchData();
    // }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <div className="component-app">
                <Header />
                <Navigation />
                <main className="main-content">
                You think water moves fast? You should see ice.
                </main>
            </div>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

    // async fetchData(): Promise<void> {

    //     const API_URL = 'https://www.bitstamp.net/api/v2/ticker/btcusd/';
    //     const API_HEADERS = {
    //         "Access-Control-Allow-Origin": "*",
    //         "Content-Type": "application/json",
    //         "Accept": "application/json"
    //     }

    //     try {
    //         const response = await fetch(API_URL, { headers: new Headers(API_HEADERS) });

    //         const data = await response.json();
    //         console.log(data);
    //     } catch (e) {
    //         console.log("Main::fetchData() " + e.message);
    //     }
    // }
}