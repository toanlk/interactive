import * as React from 'react';
import NotificationsIcon from 'material-ui-icons/Notifications';
import { AppBar, Toolbar, Typography, Avatar, IconButton } from 'material-ui';
import withWidth from 'material-ui/utils/withWidth';

//// Props and States /////////////////////////////////////////////////////////////////////

export interface HeaderState { rates: any }
export interface HeaderProps extends React.Props<Header> { }

//// Class ///////////////////////////////////////////////////////////////////////////////

export class Header extends React.Component<HeaderProps, HeaderState> {

    constructor(props: HeaderProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): HeaderState {
        return { rates: { high: 0, bid: 0 } }
    }

    componentDidMount() {
        //console.log("Header::componentDidMount() ");
        //this.fetchData();
        //setInterval(this.fetchData.bind(this), 30000); // 30 seconds in milliseconds
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <AppBar position="static" color="default" className="appbar">
                <Toolbar>
                    <img src="./src/assets/img/icon-module.png" className="icon-header"/>
                    <Typography type="title" color="inherit" className="flex">
                        Dashboard
                    </Typography>
                    <div className="real-time">
                        Bid: <span>{this.state.rates.bid}</span>
                    </div>
                    <IconButton className="btnNotification">
                        <NotificationsIcon />
                    </IconButton>
                    <Avatar alt="Toan" src="./src/assets/img/photo.jpg" className="avatar" />
                </Toolbar>
            </AppBar>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

    async fetchData(): Promise<{ high: number }> {

        //console.log("Header::fetchData()");

        const API_URL = 'https://www.bitstamp.net/api/v2/ticker/btcusd/';
        const API_HEADERS = {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

        let data = null;

        try {
            const response = await fetch(API_URL, { headers: new Headers(API_HEADERS) });

            data = await response.json();
            //console.log(data);

            this.setState({ rates: { high: data.high, bid: data.bid } });

        } catch (e) {
            console.log("Main::fetchData() " + e.message);
        }

        return data;
    }
}