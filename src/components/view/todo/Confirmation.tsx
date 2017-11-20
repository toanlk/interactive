import * as React from 'react';
import { Button } from 'material-ui';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle, withMobileDialog, } from 'material-ui/Dialog';

//// Props and States /////////////////////////////////////////////////////////////////////

export interface ConfirmationState { open: boolean }
export interface ConfirmationProps extends React.Props<Confirmation> { fullScreen?: boolean, title?: string, text?: string }

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
        return { open: false }
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <Dialog fullScreen={this.props.fullScreen} open={this.state.open} onRequestClose={this.handleRequestClose}>
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.props.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleRequestClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this.handleRequestClose} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };
}