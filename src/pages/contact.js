import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
    mt: {
        marginTop: "10vh"
    },
    inputField: {
        display: "flex",
        marginTop: "10px"
    }
}

export class contact extends Component {
    
    componentDidMount(){
        window.scrollTo(0, 0);
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container>
                <Grid xs={3} />
                <Grid xs className={classes.mt}>
                    <form action="/contactsubmit" method="POST">
                        <TextField
                            placeholder="Name"
                            className={classes.inputField}
                            variant="outlined"
                            name="name" />
                        <TextField
                            placeholder="Email"
                            type="email"
                            className={classes.inputField}
                            variant="outlined"
                            name="email" />
                        <TextField
                            placeholder="Title"
                            className={classes.inputField}
                            variant="outlined"
                            name="title" />
                        <TextField 
                            placeholder="Details" 
                            name="details" 
                            multiline 
                            rows={4} 
                            required 
                            className={classes.inputField}
                            variant="outlined" /><br />
                        <Button type="submit" color="primary" variant="contained">Submit</Button>
                    </form>    
                </Grid>
                <Grid xs={3} />
            </Grid>
        )
    }
}

export default withStyles(styles)(contact);
