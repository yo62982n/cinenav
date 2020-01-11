import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/userAction';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import withStyles from '@material-ui/core/styles/withStyles';

import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    drawer: {
        minWidth: "200px"
    }
}

export class BurgerMenu extends Component {
    state = {
        drawer: false
    }
    
    render() {
        const {classes} = this.props;
        // const sideList = (this.state.authenticated)
        console.log("auth state from burger menu");
        console.log(this.props.authenticated);

        if(this.props.authenticated){
            var sideList = <Button className={classes.drawer} onClick={logout}>Logout</Button>
        }else{
            var sideList = (
                <div>
                    <Button className={classes.drawer} component={Link} to="/signup">Register</Button>
                    <br></br>
                    <Button className={classes.drawer} component={Link} to="/login">Log In</Button>
                </div>)
        }

        return (
            <div>
                <Button onClick={function(){
                    this.setState({
                        drawer: true
                    });
                }.bind(this)}><MenuIcon /></Button>
                <Drawer anchor="right" open={this.state.drawer} onClose={function(){
                    this.setState({
                        drawer: false
                    });
                }.bind(this)}>
                    {sideList}
                </Drawer>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.authenticated
})

export default withStyles(styles)(connect(mapStateToProps)(BurgerMenu));
