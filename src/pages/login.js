import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loginUser } from '../redux/userAction';

class Login extends Component {
    
    state = {
        email: '',
        password: '',
        // token: '',
        errors: {}
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    handleSubmit(event){
        event.preventDefault();
        let authData = {
            email: this.state.email,
            password: this.state.password
        }
        loginUser(authData, this.props.history);
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    render() {
        //console.log(this.props)
        return (
            <Grid container>
                <Grid item xs />
                <Grid item sm>
                    <h2>Login</h2>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            type="email" 
                            name="email"
                            label="Email"
                            fullWidth
                            value={this.state.email} 
                            onChange={this.handleChange.bind(this)} 
                        />
                        <TextField 
                            type="password" 
                            name="password" 
                            label="Password"
                            fullWidth
                            value={this.state.password} 
                            onChange={this.handleChange.bind(this)} 
                        />
                        <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
                    </form>
                </Grid>
                <Grid item xs />
            </Grid>
        )
    }
}

export default Login
