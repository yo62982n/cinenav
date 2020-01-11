import axios from 'axios';

import store from './store';

export const loginUser = (data, history) => {
    
    axios.post("https://us-central1-cinenav-65573.cloudfunctions.net/login ", {email: data.email, password: data.password})
        .then(res => {
            //console.log(res.data.token);
            localStorage.setItem('FBIdToken', res.data.token);
            store.dispatch({ type: "LOG_IN", payload: res.data });
            history.push("/recommendations")
        })
        .catch(err => console.log(err));   
}


export const logout = () => {
    localStorage.removeItem('FBIdToken');
    store.dispatch({ type: "LOG_OUT"});
}