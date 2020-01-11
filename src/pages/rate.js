import React, { Component } from 'react';
import axios from "axios";
import MovieCard from "../components/moviecard";
import InfiniteScroll from "react-infinite-scroll-component";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import SearchIcon from '@material-ui/icons/Search';

let page = 1;

export class Rate extends Component {
    
    state = {
        movieList: [],
        query: ""
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        page = 1;
        let query = this.props.match.params.query;
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5db881d3ea32d395b4eaddb1cd022090&language=en-US&page=${page}`)
            .then(res => {
                page = page + 1;
                return this.setState({
                    movieList : res["data"]["results"],
                    page: page
                });
            }) 
            .catch(err =>{
                console.log(err);
            })
    }

    fetchMoreData(){
        let query = this.props.match.params.query;
        setTimeout(()=>{
            axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5db881d3ea32d395b4eaddb1cd022090&language=en-US&page=${page}`)
            .then(res => {
                page = page + 1;
                return this.setState({
                    movieList : this.state.movieList.concat(res["data"]["results"])
                });
            });
        }, 1500);
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.history.push(`/search/${this.state.query}`);
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    render() {
        return (
            <Grid container spacing={5}>
                <Grid item sm={2} />
                <Grid item sm={8} xs={12}>
                    <div className="marginTop">
                        <form class="form-inline" onSubmit={this.handleSubmit.bind(this)} noValidate>
                            <input className="searchBar" name="query" onChange={this.handleChange.bind(this)}></input>
                            <button type="submit" onClick={this.handleSubmit.bind(this)}><SearchIcon /></button>
                        </form> 
                    </div>
                    <InfiniteScroll
                        dataLength={this.state.movieList.length}
                        next={this.fetchMoreData.bind(this)}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        >
                        {this.state.movieList.map(movie => <MovieCard movie={movie} />)}
                    </InfiniteScroll>
                </Grid>
                <Grid item sm={2} />
            </Grid>
        )
    }
}

export default Rate