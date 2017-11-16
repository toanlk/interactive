import * as React from 'react';
import AssessmentIcon from 'material-ui-icons/Assessment';
import EuroIcon from 'material-ui-icons/EuroSymbol';
import BookIcon from 'material-ui-icons/Book';
import LayersIcon from 'material-ui-icons/Layers';
import HomeIcon from 'material-ui-icons/Home';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import ViewQuiltIcon from 'material-ui-icons/ViewQuilt';
import {  IconButton, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from 'material-ui';

//// Props and States /////////////////////////////////////////////////////////////////////

export interface MainState { open: boolean }
export interface MainProps extends React.Props<Navigation> { }

//// Class ///////////////////////////////////////////////////////////////////////////////

export class Navigation extends React.Component<MainProps, MainState> {

    constructor(props: MainProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): MainState {
        return { open: true }
    }

    handleDrawerToggle = () => {
        this.setState({ open: !this.state.open });
    };

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <Drawer type="permanent" className="drawerPaper" open={this.state.open}>
                <div className={this.state.open ? "drawerInner" : "drawerInnerClose"}>
                    <div className="drawerHeader"></div>
                    <List className="lstMenu">
                        <ListItem button className="selected">
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon><ViewQuiltIcon /></ListItemIcon>
                            <ListItemText primary="Customization" />
                        </ListItem>
                        <Divider />
                        <ListItem className="lstTitle">
                            <ListItemText primary="Reports" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><LayersIcon /></ListItemIcon>
                            <ListItemText primary="Map" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><BookIcon /></ListItemIcon>
                            <ListItemText primary="Topics" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><AssessmentIcon /></ListItemIcon>
                            <ListItemText primary="Performance" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><EuroIcon /></ListItemIcon>
                            <ListItemText primary="Trading" />
                        </ListItem>
                    </List>
                    <div className="drawerBottom">
                        <IconButton onClick={this.handleDrawerToggle} className="btnToggle">
                            { this.state.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                </div>
            </Drawer>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

}