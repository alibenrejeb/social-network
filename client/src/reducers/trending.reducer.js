import { GET_POST_TRENDS, LIKE_POST } from "../constants/actionTypes";

const trendingReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_POST_TRENDS:
        return action.payload;
      case LIKE_POST:
        return Array.isArray(state)
          ? state
              .slice()
              .map((post) => {
                return post._id === action.payload.postId
                  ? action.payload.data.like
                    ? {
                        ...post,
                        totalLikes: post.totalLikes + 1,
                        usersLiked: [
                          ...post.usersLiked,
                          action.payload.data.userId,
                        ],
                      }
                    : {
                        ...post,
                        totalLikes: post.totalLikes - 1,
                        usersLiked: post.usersLiked.filter(
                          (id) => id !== action.payload.data.userId
                        ),
                      }
                  : post;
              })
              .sort((a, b) => b.totalLikes - a.totalLikes)
          : [];
      default:
        return state;
    }
};

export default trendingReducer;