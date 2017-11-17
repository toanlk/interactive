import * as React from 'react';

import { Card, CardHeader, CardContent, LinearProgress, Grid, Typography } from 'material-ui';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

//// Props and States /////////////////////////////////////////////////////////////////////

export interface MainState { }
export interface MainProps extends React.Props<Trading> { store: any }

//// Class ///////////////////////////////////////////////////////////////////////////////

export class Trading extends React.Component<MainProps, MainState> {

    constructor(props: MainProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): MainState {
        return {}
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {

        let progress_sell = (this.props.store.buy_trans.length / this.props.store.numbTrans) * 100;
        let progress_buy = (this.props.store.sell_trans.length / this.props.store.numbTrans) * 100;

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
                                {numberWithCommas(this.props.store.total_buy)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardHeader title="Sell" />
                        <CardContent>
                            <Typography type="headline" component="h1" color={'accent'}>
                                {numberWithCommas(this.props.store.total_sell)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardHeader title="Profit" />
                        <CardContent>
                            <Typography type="headline" component="h1" color={'accent'}>
                                {numberWithCommas(this.props.store.total_profit)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardHeader title="Summary" subheader={this.props.store.numbTrans + " transactions"} />
                        <CardContent>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography type="headline" component="h1">
                                        {this.props.store.buy_trans.length}
                                    </Typography>
                                    <Typography component="p">Buying Transactions</Typography>
                                    <LinearProgress value={progress_buy} mode="determinate" className="progress-bar" />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography type="headline" component="h1">
                                        {this.props.store.sell_trans.length}
                                    </Typography>
                                    <Typography component="p">Selling Transactions</Typography>
                                    <LinearProgress color={'accent'} value={progress_sell} mode="determinate" className="progress-bar" />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Last buying transactions" subheader={this.props.store.last_buy_trans.length + " transactions"} />
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Reference ID</TableCell>
                                        <TableCell numeric>Coin (bcn)</TableCell>
                                        <TableCell numeric>Price (vnd)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.store.last_buy_trans.map((trans: { ref: string, coin_amount: number, fiat_amount: number }) => {
                                        return (
                                            <TableRow key={trans.ref}>
                                                <TableCell>{trans.ref}</TableCell>
                                                <TableCell numeric>{trans.coin_amount}</TableCell>
                                                <TableCell numeric>{numberWithCommas(trans.fiat_amount)}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>{}</TableCell>
                                        <TableCell>{}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

}

export function numberWithCommas(x: number) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts[0];
    //return parts.join(".");
}