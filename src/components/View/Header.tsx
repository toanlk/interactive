import * as React from 'react';
import NotificationsIcon from 'material-ui-icons/Notifications';
import { AppBar, Toolbar, Typography, Avatar, IconButton } from 'material-ui';

//// Props and States /////////////////////////////////////////////////////////////////////

export interface MainState {}
export interface MainProps extends React.Props<Header> {}

//// Class ///////////////////////////////////////////////////////////////////////////////

export class Header extends React.Component<MainProps, MainState> {

    constructor(props: MainProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): MainState {
        return {}
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <AppBar position="static" color="default" className="appbar">
                <Toolbar>
                    <Typography type="title" color="inherit" className="flex">
                        Dashboard
                    </Typography>
                    <IconButton className="btnNotification">
                        <NotificationsIcon />
                    </IconButton>
                    <Avatar alt="Toan" src="./src/assets/img/photo.jpg" className="avatar" />
                </Toolbar>
            </AppBar>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

}