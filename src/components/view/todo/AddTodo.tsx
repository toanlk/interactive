import * as React from 'react';

import { TextField, Button } from 'material-ui';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';

//// Props and States /////////////////////////////////////////////////////////////////////

export interface AddTodoState { inputTask: string }
export interface AddTodoProps extends React.Props<AddTodo> { open: boolean, handleClose: (task: string) => void }

//// Class ///////////////////////////////////////////////////////////////////////////////

export class AddTodo extends React.Component<AddTodoProps, AddTodoState> {

    constructor(props: AddTodoProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): AddTodoState {
        return { inputTask: '' }
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <Dialog open={this.props.open} onRequestClose={this.handleCloseDialog.bind(this)}>
                <DialogTitle>New Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        What tasks are you planning to perform?
                    </DialogContentText>
                    <TextField autoFocus margin="dense" id="task" label="Task" type="text" fullWidth
                        value={this.state.inputTask} onChange={evt => this.updateInputValue(evt)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseDialog.bind(this)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleCloseDialog.bind(this)} color="primary">
                        Add a todo
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

    updateInputValue(evt) {
        this.setState({ inputTask: evt.target.value });
    }
    
    handleCloseDialog() {
        this.props.handleClose(this.state.inputTask)
    }
}