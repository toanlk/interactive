import * as React from 'react';
import { observer } from 'mobx-react';

import { Grid } from 'material-ui';
import { Editor } from './View/Editor';
import { EditorState } from './Logic/EditorState';

//// Props and States /////////////////////////////////////////////////////////////////////

export interface MainState { }
export interface MainProps extends React.Props<Main> { }

//// Class ///////////////////////////////////////////////////////////////////////////////

let editorState = new EditorState();

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
        console.log("Main::componentDidMount() ");
        this.fetchData();
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {

        return (
            <Grid container spacing={8} className="component-app">
                <Grid item xs={5} className="panel-editor">
                    <h1>CSS Editor</h1>
                    <Editor store={editorState} />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={5} className="panel-editor">
                    <h1>Live preview</h1>
                    <div style={editorState.styles}>Interactive Map</div>
                </Grid>
            </Grid>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

    async fetchData(): Promise<void> {

        const API_URL = 'https://www.bitstamp.net/api/v2/ticker/btcusd/';
        const API_HEADERS = {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

        try {

            const response = await fetch(API_URL, { headers: new Headers(API_HEADERS) });

            const data = await response.json();
            console.log(data);
        } catch (e) {
            console.log("Main::fetchData() " + e.message);
        }
    }
}