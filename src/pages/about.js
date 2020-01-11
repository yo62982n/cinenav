import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';

const styles = {
    left: {
        height: "100vh"
    },
    right: {
        marginTop: "15vh"
    },
    textLeft: {
        textAlign: "left"
    }
}

class about extends Component {
    state = {
        content: 1
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    render() {
        const { classes } = this.props;
        let rightSection;

        if(this.state.content == 1){
            rightSection = (<div>Have you ever had a time when you could not figure out what movie to watch?

                That is where CineNav comes in, CineNav is an application which is designed to use your decisions on the movies you like formulate a profile of the types of movie you like and then with your profile assembled the app can start suggesting movies for you to watch.
                
                As you keep using the application your choices are learned and the application can get a better feel of whether or not you liked the suggestion.
                
                CineNav the right way to choose a movie. </div>);
        }else if(this.state.content == 2){
            rightSection = (<div>Solvi, Arun, James, Chris, Youngkwang</div>);
        }

        return (
            <Grid container spacing={5}>
                <Grid item xs={12} sm={4}>
                    <Hidden xsDown>
                        <h1 className={classes.textLeft}>About Us</h1>
                    </Hidden>
                    <List component="nav" aria-label="secondary mailbox folders">
                        <ListItem button onClick={function(){
                                this.setState({
                                    content: 1
                                })
                            }.bind(this)}>
                            <ListItemText primary="CineNav Project" />
                        </ListItem>
                        <ListItem button  onClick={function(){
                                this.setState({
                                    content: 2
                                })
                            }.bind(this)}>
                        <ListItemText primary="Our Team" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <div className={classes.right}>
                        {rightSection}
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(about);