import * as React from 'react';
import { observer } from 'mobx-react';
import * as firebase from "firebase";
import { Transactions } from '../logic/Transactions';

import { LastTransactions } from '../view/trading/LastTransactions';

import { Card, CardHeader, CardContent, LinearProgress, Grid, Typography } from 'material-ui';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

//// Props and States /////////////////////////////////////////////////////////////////////

export interface TradingState { db: any, store: any }
export interface TradingProps extends React.Props<Trading> { }

//// Class ///////////////////////////////////////////////////////////////////////////////

@observer
export class Trading extends React.Component<TradingProps, TradingState> {

    constructor(props: TradingProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): TradingState {
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

        let firebaseRef = firebase.database().ref('trading');

        const store = new Transactions();

        return { db: firebaseRef, store: store }
    }

    componentDidMount() {
        this.fetchTrading();
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {

        let progress_sell = (this.state.store.buy_trans.length / this.state.store.numbTrans) * 100;
        let progress_buy = (this.state.store.sell_trans.length / this.state.store.numbTrans) * 100;

        return (
            <Grid container>
                <Grid item xs={12}>
                    You think water moves fast? You should see ice.
                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardHeader title="Buy" />
                        <CardContent>
                            <Typography type="headline" component="h1" color={'primary'}>
                                {numberWithCommas(this.state.store.total_buy)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardHeader title="Sell" />
                        <CardContent>
                            <Typography type="headline" component="h1" color={'accent'}>
                                {numberWithCommas(this.state.store.total_sell)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardHeader title="Profit" />
                        <CardContent>
                            <Typography type="headline" component="h1" color={'accent'}>
                                {numberWithCommas(this.state.store.total_profit)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardHeader title="Summary" subheader={this.state.store.numbTrans + " transactions"} />
                        <CardContent>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography type="headline" component="h1">
                                        {this.state.store.buy_trans.length}
                                    </Typography>
                                    <Typography component="p">Buying Transactions</Typography>
                                    <LinearProgress value={progress_buy} mode="determinate" className="progress-bar" />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography type="headline" component="h1">
                                        {this.state.store.sell_trans.length}
                                    </Typography>
                                    <Typography component="p">Selling Transactions</Typography>
                                    <LinearProgress color={'accent'} value={progress_sell} mode="determinate" className="progress-bar" />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <LastTransactions store={this.state.store} />
                </Grid>
                <Grid item xs={12}>
                    <LastTransactions store={this.state.store} type="sell" />
                </Grid>
            </Grid>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

    async fetchTrading() {

        // Read data once
        let transactions = await this.state.db.once('value').then(function (snapshot) {
            return snapshot.val();
        });
      
        transactions = transactions.filter((trans: any) => {
            if (trans) return trans;
        });

        this.state.store.transactions = transactions;
    }
}

export function numberWithCommas(x: number) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts[0];
    //return parts.join(".");
}