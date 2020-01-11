import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Pages
import Home from './pages/home';
import Recommendations from './pages/recommendations';
import Rate from './pages/rate';
import Login from './pages/login';
import Signup from './pages/signup';
import news from './pages/news';
import noMatch from './pages/noMatch';
import About from './pages/about'
import Contact from './pages/contact';
import movieDetail from './pages/movieDetail';
import Search from './pages/search';
import jwtDecode from 'jwt-decode';

//Components
import Navbar from './components/navbar';
import CustomFooter from './components/customFooter';

import axios from 'axios';
import store from './redux/store';
import { logout } from './redux/userAction';

import './App.css';

axios.defaults.baseURL = "https://us-central1-test-cinenav.cloudfunctions.net/api"
const token = localStorage.FBIdToken;

if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    logout();    
  }else{
    store.dispatch({ type: "LOG_IN", payload: {token: token} });
  }
}

function App() {
  return (
    
      <div className="App">
        <Router>
          <Navbar />
          <div className="container vhhundred">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/recommendations" component={Recommendations} />
              <Route exact path="/rate" component={Rate} />
              <Route exact path="/news" component={news} />
              <Route exact path="/aboutus" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route path="/movie/:movieId" component={movieDetail} />
              <Route path="/search/:query" component={Search} />
              <Route component={noMatch} />
            </Switch>
          </div>
          <div className="gapContentFooter"/>
          <CustomFooter />
        </Router>
      </div>
    
  );
}

export default App;
