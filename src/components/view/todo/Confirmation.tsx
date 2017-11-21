import * as React from 'react';
import { Button } from 'material-ui';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle, withMobileDialog, } from 'material-ui/Dialog';

//// Props and States /////////////////////////////////////////////////////////////////////

export interface ConfirmationState {}
export interface ConfirmationProps extends React.Props<Confirmation> { 
    open: boolean, handleClose: (is_confirm: boolean) => void, title?: string, text?: string }

//// Class ///////////////////////////////////////////////////////////////////////////////

export class Confirmation extends React.Component<ConfirmationProps, ConfirmationState> {

    constructor(props: ConfirmationProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getDefaultProps() {
        return {
            title: 'Confirmation',
            text: 'Do you want to remove this item?'
        };
    }

    getInitialState(): ConfirmationState {
        return { }
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <Dialog open={this.props.open} onRequestClose={this.handleClose}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Do you want to remove this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleClose(false)} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => this.handleClose(true)} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

    handleClose(is_confirm: boolean) {
        this.props.handleClose(is_confirm);
    };
}