import * as React from 'react';
import * as firebase from "firebase";

import { TextField, Button, Grid, Checkbox, FormControlLabel } from 'material-ui';
import { Card, CardHeader, CardContent, FormLabel } from 'material-ui';
import * as moment from 'moment';
import { TimePicker, DatePicker } from 'material-ui-pickers';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import { SketchPicker } from 'react-color';

//// Props and States /////////////////////////////////////////////////////////////////////

export interface EditTodoState {
    db: any, todo: any, inputTask: string,
    inputChecked: boolean, selectedDate: any,
    selectedColor: string, displayColorPicker: boolean
}
export interface EditTodoProps extends React.Props<EditTodo> { id: string }

//// Class ///////////////////////////////////////////////////////////////////////////////

export class EditTodo extends React.Component<EditTodoProps, EditTodoState> {

    constructor(props: EditTodoProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): EditTodoState {

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

        let firebaseRef = firebase.database().ref('todos');

        return {
            db: firebaseRef, todo: [], inputTask: '', inputChecked: false, selectedDate: moment(),
            selectedColor: '#333', displayColorPicker: false
        }
    }

    componentDidMount() {
        this.fetchTodo(this.props.id);
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {

        const classes = {
            bgColor: {
                background: this.state.selectedColor,
            },
        };

        return (
            <Card>
                <CardHeader title="Edit Todo" subheader={""} />
                <CardContent>
                    <form noValidate autoComplete="off">
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField margin="normal" id="id" label="ID" value={this.state.todo.id} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth margin="normal" id="task" label="Task" value={this.state.inputTask}
                                    onChange={evt => this.updateInputValue(evt)} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel label="Is Completed" control={
                                    <Checkbox checked={this.state.inputChecked}
                                        onChange={evt => this.updateInputChecked(evt)} value="1" />
                                } />
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel>Date</FormLabel>
                                <DatePicker value={this.state.selectedDate} autoOk={true}
                                    onChange={this.handleDateChange} animateYearScrolling={false}
                                    leftArrowIcon={<KeyboardArrowLeftIcon />}
                                    rightArrowIcon={<KeyboardArrowRightIcon />} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel>Color</FormLabel>
                                <div className="swatch" onClick={this.handleColorClick}>
                                    <div className="color" style={classes.bgColor} />
                                </div>
                                {this.state.displayColorPicker ?
                                    <div className="popover">
                                        <div className="cover" onClick={this.handleColorClose} />
                                        <SketchPicker color={this.state.selectedColor} onChange={this.handleColorChange} />
                                    </div> : ''}
                            </Grid>
                            <Grid item xs={12}>
                                <Button raised color="primary" onClick={() => this.updateTodo(this.props.id)}>Update</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

    async fetchTodo(id: string) {

        if (id) {
            let todo = await this.state.db.child(id).once('value').then(function (snapshot) {
                return snapshot.val();
            });

            this.setState({
                todo: todo,
                inputTask: todo.task,
                inputChecked: todo.is_completed,
                selectedDate: moment(todo.date),
                selectedColor: todo.color
            });
        }
    }

    updateInputValue(evt) {
        this.setState({ inputTask: evt.target.value });
    }

    updateInputChecked(evt) {
        this.setState({ inputChecked: evt.target.checked });
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    }

    // --------- Handle Color Picker
    handleColorClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleColorClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleColorChange = (color) => {
        this.setState({ selectedColor: color.hex });
    }

    // --------- Update todo
    updateTodo(id: string) {
        firebase.database().ref('todos/' + id).set({
            id: id,
            task: this.state.inputTask,
            is_completed: this.state.inputChecked,
            date: this.state.selectedDate.format('YYYY-MM-DD'),
            color: this.state.selectedColor
        });
    }
}