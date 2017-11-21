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
export interface NavigationProps extends React.Props<Navigation> { }

//// Class ///////////////////////////////////////////////////////////////////////////////

export class Navigation extends React.Component<NavigationProps, MainState> {

    constructor(props: NavigationProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): MainState {
        return { open: true }
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {

        let location = window.location.hash;

        let home_page = location == '' || location == '#/' ? 'selected' : '';
        let topics_page = location.indexOf('#/topics') != -1 ? 'selected' : '';
        let customization_page = location == '#/customization' ? 'selected' : '';
        let map_page = location == '#/map' ? 'selected' : '';
        let performance_page = location == '#/performance' ? 'selected' : '';
        let trading_page = location == '#/trading' ? 'selected' : '';

        return (
            <Drawer type="permanent" className="drawerPaper" open={this.state.open}>
                <div className={this.state.open ? "drawerInner" : "drawerInnerClose"}>
                    <div className="drawerHeader"></div>
                    <List className="lstMenu">
                        <Link to="/" className={home_page}>
                            <ListItem button>
                                <ListItemIcon><HomeIcon /></ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to="/customization" className={customization_page}>
                            <ListItem button>
                                <ListItemIcon><ViewQuiltIcon /></ListItemIcon>
                                <ListItemText primary="Customization" />
                            </ListItem>
                        </Link>
                        <Divider />
                        <ListItem className="lstTitle">
                            <ListItemText primary="Reports" />
                        </ListItem>
                        <Link to="/map" className={map_page}>
                            <ListItem button>
                                <ListItemIcon><LayersIcon /></ListItemIcon>
                                <ListItemText primary="Map" />
                            </ListItem>
                        </Link>
                        <Link to="/topics" className={topics_page} onClick={this.changeRoute}>
                            <ListItem button>
                                <ListItemIcon><BookIcon /></ListItemIcon>
                                <ListItemText primary="Topics" />
                            </ListItem>
                        </Link>
                        <Link to="/performance" className={performance_page}>
                            <ListItem button>
                                <ListItemIcon><AssessmentIcon /></ListItemIcon>
                                <ListItemText primary="Performance" />
                            </ListItem>
                        </Link>
                        <Link to="/trading" className={trading_page}>
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

    handleDrawerToggle = () => {
        this.setState({ open: !this.state.open });
    };

    changeRoute() {
        let location = window.location.hash;
    }
}