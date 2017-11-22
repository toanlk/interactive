import * as React from 'react';
import { observer } from 'mobx-react';
import * as firebase from 'firebase';

import ColorPicker from 'color-picker';

//// Props and States /////////////////////////////////////////////////////////////////////

export interface HomeState { }
export interface HomeProps extends React.Props<Home> { }

//// Class ///////////////////////////////////////////////////////////////////////////////

@observer
export class Home extends React.Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): HomeState {
        return {}
    }

    componentDidMount() {
        //console.log("Home::componentDidMount()");
        //this.fetchTodo();
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {

        return (
            <div>
                <ColorPicker color="#333" />
            </div>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

}
