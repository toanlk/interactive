import * as React from 'react';
import { Link } from 'react-router-dom';

import AssessmentIcon from 'material-ui-icons/Assessment';
import EuroIcon from 'material-ui-icons/EuroSymbol';
import BookIcon from 'material-ui-icons/Book';
import LayersIcon from 'material-ui-icons/Layers';
import HomeIcon from 'material-ui-icons/Home';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import ViewQuiltIcon from 'material-ui-icons/ViewQuilt';
import { IconButton, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from 'material-ui';

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
                        <Link to='/' className="selected">
                            <ListItem button>
                                <ListItemIcon><HomeIcon /></ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to="/customization">
                            <ListItem button>
                                <ListItemIcon><ViewQuiltIcon /></ListItemIcon>
                                <ListItemText primary="Customization" />
                            </ListItem>
                        </Link>
                        <Divider />
                        <ListItem className="lstTitle">
                            <ListItemText primary="Reports" />
                        </ListItem>
                        <Link to="/map">
                            <ListItem button>
                                <ListItemIcon><LayersIcon /></ListItemIcon>
                                <ListItemText primary="Map" />
                            </ListItem>
                        </Link>
                        <Link to="/topics">
                            <ListItem button>
                                <ListItemIcon><BookIcon /></ListItemIcon>
                                <ListItemText primary="Topics" />
                            </ListItem>
                        </Link>
                        <Link to="/performance">
                            <ListItem button>
                                <ListItemIcon><AssessmentIcon /></ListItemIcon>
                                <ListItemText primary="Performance" />
                            </ListItem>
                        </Link>
                        <Link to="/trading">
                            <ListItem button>
                                <ListItemIcon><EuroIcon /></ListItemIcon>
                                <ListItemText primary="Trading" />
                            </ListItem>
                        </Link>
                    </List>
                    <div className="drawerBottom">
                        <IconButton onClick={this.handleDrawerToggle} className="btnToggle">
                            {this.state.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                </div>
            </Drawer>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

}