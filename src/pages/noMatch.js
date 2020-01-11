import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
    errorCard: {
        maxWidth: "375px",
        maxHeight: "400px",
        textAlign: "center",
        margin: "30vh auto",
        padding: "1.5rem"
    },

    muktaBold: {
        fontFamily: "Mukta",
        fontWeight: "bold",
        textAlign: "left"
    },

    mukta: {
        fontFamily: "Mukta",
        textAlign: "left"
    }

}

class noMatch extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.errorCard}>
                    <Typography variant="h5" className={classes.muktaBold}>
                        Page not found
                    </Typography>
                    <br />
                    <Typography variant="body1" className={classes.mukta}>
                        The page you request is broken or not exist. Please check the URL
                    </Typography>
                    <br />
                    <Typography variant="body1" className={classes.mukta}>
                        <a href="/">Back to the home</a>
                    </Typography>
                    {/* <MovieCard movie={{title:"John Wick"}} /> */}
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(noMatch);