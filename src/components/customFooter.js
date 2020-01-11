import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const styles = {
    footer: {
        height: "50px",
        marginTop: "auto",
        background: "#666699",
        padding: "5vh 10vw"
    },

    white: {
        color: "white",
        textDecoration: "none",
        textTransform: "none"
    },

    marginTop: {
        marginTop: "auto",
        display: "inline-block",
        paddingRight: "5%",
        minWidth: "150px"
    },
    GridCenter: {
        margin: "auto"
    },
    distEven: {
        display: "flex",
        justifyContent: "space-between"
    }
}

export class CustomFooter extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.footer}>
                <Grid container className={classes.distEven}>
                    <Grid item sm={2}/>
                    <Grid item xs={8}>
                        <div className={classes.marginTop}>
                            <Button className={classes.white} component={Link} to="/aboutus">
                                <Typography variant="h6" className={classes.marginTop}>
                                    About Us
                                </Typography>
                            </Button>
                        
                            <Button className={classes.white} component={Link} to="/contact">
                                <Typography variant="h6" className={classes.marginTop}>
                                    Contact
                                </Typography>
                            </Button>
                        </div>
                    </Grid>
                    <Grid item sm={2} />    
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(CustomFooter);
