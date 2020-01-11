import React, { Component } from 'react';
import axios from 'axios';
import store from '../redux/store';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import withStyles from '@material-ui/core/styles/withStyles';

axios.defaults.baseURL = "https://us-central1-test-cinenav.cloudfunctions.net/api"

const styles = {
    raleway: {
        fontFamily: "Raleway",
        paddingTop: "1rem",
        paddingBottom: "1rem"
    },
    detailImage:{
        maxWidth: "80%",
        objectFit: "cover"
    },
    textLeft:{
        textAlign: "left",
        padding: "15px"
    },
    gap: {
        marginTop: "20px"
    },

    rateSection: {
        marginTop: "2rem"
    }
}

export class movieDetail extends Component {
    state={
        movieId: null,
        movieInfo: null,
        like: false,
        dislike: false
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        
        let movieInfo;
        let liked;
        let disliked;

        axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}?api_key=5db881d3ea32d395b4eaddb1cd022090&language=en-US`)
            .then(res => {
                movieInfo = res.data;
            })
            .then(() => {
                axios.post(
                    "https://us-central1-cinenav-65573.cloudfunctions.net/getRateState",
                    {movieId: this.props.match.params.movieId, token: store.getState().token}
                    )
                    .then(data => {
                        if(data.data.state == "liked"){
                            liked = true;
                            disliked = false;
                        }else if(data.data.state == "disliked"){
                            liked = false;
                            disliked = true;
                        }else{
                            liked = false;
                            disliked = false;
                        }
                    })
                    .then(() =>{
                        this.setState({
                            movieId: this.props.match.params.movieId,
                            movieInfo: movieInfo,
                            like: liked,
                            dislike: disliked
                        });
                    })
            })
        
    }

    like(){
        
        let movieId = this.state.movieId;
        let recommendations = [];
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=5db881d3ea32d395b4eaddb1cd022090&language=en-US&page=1`)
            .then(res => {
                if(res.data.total_result == 0){
                    return;
                }
                res.data.results.forEach(item => {
                    recommendations.push(item.id);
                })

                for(let i = 2; i <= res.data.total_pages; i++){
                    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=5db881d3ea32d395b4eaddb1cd022090&language=en-US&page=${i}`)
                        .then(res => {
                            res.data.results.forEach(item => {
                                recommendations.push(item.id);
                            })
                        })
                }
            })
            .then(() => {
                console.log("recommendations before sending add/sub call");
                console.log(recommendations)
                if(this.state.like == false){
                    axios.post(
                        "https://us-central1-cinenav-65573.cloudfunctions.net/addReco",
                        {token: store.getState().token, recommendations: recommendations, movieId: movieId })
                }else{
                    axios.post(
                        "https://us-central1-cinenav-65573.cloudfunctions.net/subReco",
                        {token: store.getState().token, recommendations: recommendations, movieId: movieId, rateType: "like" })
                }
            })
            .then(() => {
                return this.setState({
                    like: !this.state.like,
                    dislike: false
                })
            })
    }

    dislike(){
        let movieId = this.state.movieId;
        let recommendations = [];


        if(this.state.like == true){
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=5db881d3ea32d395b4eaddb1cd022090&language=en-US&page=1`)
                .then(res => {
                    if(res.data.total_result == 0){
                        return;
                    }
                    res.data.results.forEach(item => {
                        recommendations.push(item.id);
                    })

                    for(let i = 2; i <= res.data.total_pages; i++){
                        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=5db881d3ea32d395b4eaddb1cd022090&language=en-US&page=${i}`)
                            .then(res => {
                                res.data.results.forEach(item => {
                                    recommendations.push(item.id);
                                })
                            })
                    }
                })
                .then(() => {
                    console.log("recommendations before sending sub call");
                    console.log(recommendations)
                    axios.post(
                        "https://us-central1-cinenav-65573.cloudfunctions.net/subReco",
                        {token: store.getState().token, recommendations: recommendations, movieId: movieId, rateType: "dislike" })
                })
                .then(() => {
                    return this.setState({
                        dislike: true,
                        like: false
                    })
                })
            return;
        }else{
            this.rate("dislike")
            return this.setState({
                dislike: !this.state.dislike,
                like: false
            })
        }
        
    }

    rate(rateType){
        axios.post(
            "https://us-central1-cinenav-65573.cloudfunctions.net/rate",
            {movieId: this.state.movieId, type: rateType, token: store.getState().token})
    }
    
    render() {
        const { classes } = this.props;
        let title = this.state.movieInfo ? this.state.movieInfo.title : "Loading";
        let poster = this.state.movieInfo ? this.state.movieInfo.poster_path : "";
        let overview = this.state.movieInfo ? this.state.movieInfo.overview : "";
        let likeButtonClass = this.state.like ? "iconActive" : "iconDisabled";
        let dislikeButtonClass = this.state.dislike ? "iconActive" : "iconDisabled";

        return (
            <Grid container spacing={5}>
            <Grid item sm={2} />
            <Grid item sm={8} xs={12}>
                <Typography variant="h4" className={classes.raleway}>
                    {title}
                </Typography>
                <img 
                    src={"https://image.tmdb.org/t/p/w500" + poster} 
                    className={classes.detailImage}
                />
                <div className={classes.rateSection}>
                    <Button id="likeButton" className={likeButtonClass} onClick={()=>{this.like()}}><ThumbUpIcon /></Button>
                    <Button id="dislikeButton" className={dislikeButtonClass} onClick={()=>{this.dislike()}}><ThumbDownIcon /></Button>
                </div>
                <Typography className={[classes.textLeft, classes.gap].join(' ')} variant="h6">
                    {overview}
                </Typography>
            </Grid>
            <Grid item sm={2} />
        </Grid>
        )
    }
}

export default withStyles(styles)(movieDetail)


// import React, { Component } from 'react';
// import axios from 'axios';

// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';

// import withStyles from '@material-ui/core/styles/withStyles';

// axios.defaults.baseURL = "https://us-central1-test-cinenav.cloudfunctions.net/api"

// const styles = {
//     raleway: {
//         fontFamily: "Raleway",
//         paddingTop: "1rem",
//         paddingBottom: "1rem"
//     },
//     detailImage:{
//         maxWidth: "80%",
//         objectFit: "cover"
//     },
//     textLeft:{
//         textAlign: "left",
//         padding: "15px"
//     },
//     gap: {
//         marginTop: "20px"
//     }
// }

// export class movieDetail extends Component {
//     state={
//         movieId: null,
//         movieInfo: null
//     }

//     componentDidMount(){
        
//         let movieInfo;

//         axios.post('/getMovieInfo', {movieId: this.props.match.params.movieId})
//             .then(res => {
//                 movieInfo = res.data;
//             })
//             .then(() =>{
//                 this.setState({
//                     movieId: this.props.match.params.movieId,
//                     movieInfo: movieInfo
//                 });
//             })

//     }
    
//     render() {
//         const { classes } = this.props;
//         let title = this.state.movieInfo ? this.state.movieInfo.title : "Loading";
//         let poster = this.state.movieInfo ? this.state.movieInfo.poster : "";
//         return (
//             <Grid container spacing={5}>
//             <Grid item sm={2} />
//             <Grid item sm={8} xs={12}>
//                 <Typography variant="h4" className={classes.raleway}>
//                     {title}
//                 </Typography>
//                 <img 
//                     src={poster} 
//                     className={classes.detailImage}
//                 />
//                 <Typography className={[classes.textLeft, classes.gap].join(' ')} variant="h6">
//                     Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.
//                 </Typography>
//             </Grid>
//             <Grid item sm={2} />
//         </Grid>
//         )
//     }
// }

// export default withStyles(styles)(movieDetail)
