import React, { Component } from 'react';
import axios from "axios";
import MovieCard from "../components/moviecard";
import InfiniteScroll from "react-infinite-scroll-component";
import store from '../redux/store';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    raleway: {
        fontFamily: "Raleway",
        paddingTop: "1rem",
        paddingBottom: "1rem"
    },
    listPadding: {
        padding: "2px"
    }
}

export class Test extends Component {
    
    state = {
        recommendations: [],
        movieList: [],
        next: 0
    }

    componentDidMount(){
        if(!store.getState().authenticated){
            this.props.history.push("/login");
        }
        
        window.scrollTo(0, 0);
        let recommendations;
        let movieList = [];
        axios.post(`https://us-central1-cinenav-65573.cloudfunctions.net/recommendTest`,
                    {token: store.getState().token})
            .then(res => {
                recommendations = res.data.recommendations;
                let loopEnd = (recommendations.length > 5) ? 5 : recommendations.length;
                this.getMovieDetail(0, loopEnd, recommendations)
                    .then(item => {
                        item.forEach(inRes => {
                            if(inRes.data.title == ""){
                                inRes.data.title = inRes.data.original_title;
                            }
                            movieList.push(inRes.data);
                        })
                    })
                    .then(() => {
                        this.setState({
                            movieList: movieList,
                            recommendations: recommendations,
                            next: loopEnd
                        })
                    })
                
            }) 
            .catch(err =>{
                console.log(err);
            })
    }

    getMovieDetail = async (fromIndex, toIndex, recommendations) =>{
        let list = recommendations.slice(fromIndex, toIndex);
        let i = 0;
        let promise = [];
        list.forEach(item => {
            promise[i] = axios.get(`https://api.themoviedb.org/3/movie/${item}?api_key=5db881d3ea32d395b4eaddb1cd022090&language=en-US`);
            i++;
        })

        let result = [];

        for(let j = 0; j < i; j++){
            result[j] = await promise[j];
        }

        return result;
    }

    fetchMoreData(){
        let movieList = [];
        let loopEnd = (this.state.recommendations.length > this.state.next + 5) ? this.state.next + 5 : this.state.recommendations.length;
        this.getMovieDetail(this.state.next, loopEnd, this.state.recommendations)
            .then(res => {
                res.forEach(item => {
                    if(item.data.title == ""){
                        item.data.title = item.data.original_title;
                    }
                    movieList.push(item.data);
                })
            })
            .then(() => {
                this.setState({
                    movieList: this.state.movieList.concat(movieList),
                    next: loopEnd
                });
            })
    }

    render() {

        const { classes } = this.props;

        return (
            <Grid container spacing={5}>
                <Grid item sm={2} />
                <Grid item sm={8} xs={12}>
                    <Typography variant="h4" className={classes.raleway}>
                        Cinenav recommends you
                    </Typography>
                    <InfiniteScroll
                        dataLength={this.state.movieList.length}
                        next={this.fetchMoreData.bind(this)}
                        hasMore={this.state.recommendations.length > this.state.next}
                        loader={<h4>Loading...</h4>}
                        >
                        {this.state.movieList.map(movie => <MovieCard movie={movie} />)}
                    </InfiniteScroll>
                    {/* <MovieCard movie={{id:512200, poster_path: "/l4iknLOenijaB85Zyb5SxH1gGz8.jpg", title: "Jumanji: The Next Level"}} /> */}
                </Grid>
                <Grid item sm={2} />
            </Grid>
        )
    }
}

export default withStyles(styles)(Test);