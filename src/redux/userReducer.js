const initialState = {
    authenticated: false,
    token: ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case "LOG_IN":
            return {
                authenticated: true,
                token: action.payload.token
            };
        case "LOG_OUT":
            return {
                authenticated: false,
                token: ''
            };
        default:
            return state;
    }
}

export default userReducer;