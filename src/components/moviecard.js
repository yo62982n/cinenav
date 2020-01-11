import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Container from '@material-ui/core/Container'
// import Rating from '@material-ui/lab/Rating';
// import Button from '@material-ui/core/Button';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// import ThumbUpIcon from '@material-ui/icons/ThumbUp';
// import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const styles = {
    image: {
        width: 200,
        height: 200,
        objectFit: 'contain',
        maxWidth: '100%',
    },

    card: {
        marginTop : 10,
        display: 'flex'
    },

    rating: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardTitle: {
        margin: "auto",
        textAlign: "center"
    },
    cardMukta:{
        fontFamily: "Mukta",
        fontWeight: "bold",
        textAlign: "center"
    },
    detailImage:{
        maxHeight: "400px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block"
    },
    cardImage:{
        minWidth: 200,
        height: 200,
        objectFit: 'scale-down',
        maxWidth: '100%',
    }
}

class MovieCard extends Component {
    
    render() {
        const { title, poster_path, id } = this.props.movie;
        const { classes } = this.props;
        return (
            <div>
                <Card component={Link} to={"/movie/" + id} className={classes.card}>
                    <CardMedia image={"https://image.tmdb.org/t/p/w500" + poster_path} className={classes.cardImage} />
                    <CardContent className={classes.cardTitle}>
                        <Typography variant="h5" className={classes.cardMukta}>
                            {title}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(MovieCard);
