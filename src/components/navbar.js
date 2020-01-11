import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../redux/userAction';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import BurgerMenu from './burgerMenu';

const styles = {
    navLogo: {
        maxHeight: 35,
        verticalAlign: "middle",
        float: "left",
        marginLeft: "10%"
    },
    navTitle: {
        display: "inline",
        verticalAlign: "middle",
        color: "black",
        fontFamily: "Supermercado One",
        fontSize: '1.4rem',
        float: "left"
    },
    floatRight:{
        float: "right"
    },
    distEven: {
        display: "flex",
        justifyContent: "space-around",
    },
    raleway: {
        fontFamily: "Raleway",
        textTransform: "none",
        fontWeight: "bold",
        fontSize: "1rem"
    }
}

class navbar extends Component {
    state = {
        authenticated : 'false',
        drawer: false
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({
            authenticated: nextProps.authenticated
        })
    }
    
    
    render() {   
        let authIcons;
        let logoutButton;
        const { classes } = this.props;

        if(this.props.authenticated){ // it doesn't work properly when I use "this.state.authenticated" instead of "this.props.authenticated"
            //console.log("authenticated!")
            authIcons = (
                <div className={classes.floatRight}>
                    <Button component={Link} to="/profile">
                        <AccountCircleIcon />
                    </Button>
                </div>
            )
            logoutButton = (
                <Button onClick={logout}>
                    Logout
                </Button>
            );
        }else{
            //console.log("not authenticated!")
            authIcons = (
                <div className={classes.floatRight}>
                    <Button component={Link} to="/login">
                        <AccountCircleIcon />
                    </Button>
                    <Button component={Link} to="/signup">
                        <PersonAddIcon />
                    </Button>
                </div>
            )
            logoutButton = null
        }
        //console.log(this.props.authenticated);
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    <Grid container className={classes.distEven}>
                        <Grid item xs={2}>
                            <Hidden smDown>
                                <img className={classes.navLogo} src="https://firebasestorage.googleapis.com/v0/b/test-cinenav.appspot.com/o/cine_logo.png?alt=media" />
                                <Typography variant="h6" className={classes.navTitle}>CineNav</Typography>
                            </Hidden>
                        </Grid>
                        <Grid item sm className={classes.distEven}>
                            <Grid container>
                                <Grid item xs>
                                    <Button component={Link} to="/recommendations">
                                        <Hidden xsDown>
                                            <a className={classes.raleway}>Recommendations</a>
                                        </Hidden>
                                        <Hidden smUp>
                                            <a className={classes.raleway}>Reco.</a>
                                        </Hidden>                                 
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button component={Link} to="/rate">
                                        <a className={classes.raleway}>Movies</a>
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button component={Link} to="/news">
                                        <a className={classes.raleway}>News</a>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Hidden smDown>
                                {authIcons}
                                {logoutButton}
                            </Hidden>
                            <Hidden className={classes.floatRight} mdUp>
                                <BurgerMenu />
                            </Hidden>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.authenticated
})

export default withStyles(styles)(connect(mapStateToProps)(navbar));
