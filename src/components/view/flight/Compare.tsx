import * as React from 'react';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { Card, CardHeader, CardContent, LinearProgress, Grid, Typography } from 'material-ui';

//// Props and States /////////////////////////////////////////////////////////////////////

export interface CompareState { }
export interface CompareProps extends React.Props<Compare> { flights: any }

//// Class ///////////////////////////////////////////////////////////////////////////////

export class Compare extends React.Component<CompareProps, CompareState> {

    constructor(props: CompareProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): CompareState {
        return { }
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {

        let lstFlights = null;

        if (this.props.flights && this.props.flights.length > 0) {
            let cnt = 0;
            lstFlights = this.props.flights.map((flight: any) => {
                cnt = cnt + 1;
                return (
                    <TableRow key={flight.FlightCode}>
                        <TableCell>{cnt}</TableCell>
                        <TableCell>{flight.From} - {flight.To}</TableCell>
                        <TableCell>{flight.TimeFrom} - {flight.TimeTo}</TableCell>
                        <TableCell>{flight.FlightCode}</TableCell>
                        <TableCell>{flight.Eco}</TableCell>
                    </TableRow>
                );
            });
        }

        return (
            <Grid container>
                <Grid item xs={12}>
                    You think water moves fast? You should see ice.
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Flights" subheader={" tasks"} />
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No.</TableCell>
                                        <TableCell>Route</TableCell>
                                        <TableCell>Time</TableCell>
                                        <TableCell>FlightCode</TableCell>
                                        <TableCell>Eco</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lstFlights}
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