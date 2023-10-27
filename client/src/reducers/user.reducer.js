import {
  GET_USER,
  UPDATE_BIO,
  UPDATE_PICTURE,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../constants/actionTypes";

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPDATE_BIO:
            return { ...state, bio: action.payload };
        case UPDATE_PICTURE:
            return { ...state, picture: action.payload };
        case FOLLOW_USER:
            return { ...state, following: [...state.following, action.payload] };
        case UNFOLLOW_USER:
            return { ...state, following: state.following.filter((user) => user !== action.payload) };
        default:
            return state;
    }
};

export default userReducer;
