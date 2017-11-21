import * as React from 'react';

import { Card, CardHeader, CardContent, LinearProgress, Grid, Typography } from 'material-ui';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

//// Props and States /////////////////////////////////////////////////////////////////////

export interface LastTransactionsState { }
export interface LastTransactionsProps extends React.Props<LastTransactions> { store: any, type?: string }

//// Class ///////////////////////////////////////////////////////////////////////////////

export class LastTransactions extends React.Component<LastTransactionsProps, LastTransactionsState> {

    constructor(props: LastTransactionsProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): LastTransactionsState {
        return {}
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {

        let text = "Last buying transactions";
        let last_trans = this.props.store.last_buy_trans;
        let last_total_bcn = this.props.store.last_buy_bcn_total;
        let last_total_vnd = this.props.store.last_buy_vnd_total;

        if(this.props.type == 'sell') {
            text = "Last selling transactions";
            last_trans = this.props.store.last_sell_trans;
            last_total_bcn = this.props.store.last_sell_bcn_total;
            last_total_vnd = this.props.store.last_sell_vnd_total;
        }

        return (
            <Card>
                <CardHeader title={text} subheader={last_trans.length + " transactions"} />
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
                            {last_trans.map((trans: { ref: string, coin_amount: number, fiat_amount: number }) => {
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
                                <TableCell numeric><b>{last_total_bcn}</b></TableCell>
                                <TableCell numeric><b>{numberWithCommas(last_total_vnd)}</b></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
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