import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import store from '../redux/store';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class Signup extends Component {
    
    state = {
        email: '',
        password: '',
        token: '',
        handlename: '',
        confirmPassword: '',
        errors: {}
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    handleSubmit(event){
        event.preventDefault();
        axios.post("https://us-central1-cinenav-65573.cloudfunctions.net/signup", {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handlename: this.state.handlename
        })
        .then(res => {
            localStorage.setItem('FBIdToken', res.data.token);
            store.dispatch({ type: "LOG_IN", payload: res.data })
            this.setState({
                token: res.data.token
            })
            this.props.history.push("/rate");
        })
        .catch(err =>{
            console.log(err);
        })
        
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    render() {
        return (
            <Grid container>
                <Grid item xs />
                <Grid item sm>
                    <h2>Signup</h2>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            type="string" 
                            name="handlename"
                            label="Handlename"
                            fullWidth
                            value={this.state.handlename} 
                            onChange={this.handleChange.bind(this)} 
                        />
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
                        <TextField 
                            type="password" 
                            name="confirmPassword" 
                            label="Confirm Password"
                            fullWidth
                            value={this.state.confirmPassword} 
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


export default Signup
