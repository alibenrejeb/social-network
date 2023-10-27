import { GET_USER, UPDATE_BIO, UPDATE_PICTURE } from "../constants/actionTypes";

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPDATE_BIO:
            return {...state, bio: action.payload };
        case UPDATE_PICTURE:
            return { ...state, picture: action.payload };
        default:
            return state;
    }
};

export default userReducer;
