import {
  GET_USER,
  UPDATE_BIO,
  UPDATE_PICTURE,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../constants/actionTypes";
import * as api from '../api';

export const getUser = (userId) => async (dispatch) => {
    try {
        const { data } = await api.getUser(userId);
        dispatch({ type: GET_USER, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateBio =
  (userId, { bio }) =>
  async (dispatch) => {
    try {
      const { data } = await api.updateUser(userId, { bio });
      dispatch({ type: UPDATE_BIO, payload: data.bio });
    } catch (error) {
      console.log(error.message);
    }
  };

export const updatePicture = (formData, userId, type) => async (dispatch) => {
    try {
      const { data } = await api.updatePicture(formData, userId, type);
      dispatch({ type: UPDATE_PICTURE, payload: data.picture });
    } catch (error) {
      console.log(error.message);
    }
};

export const followUser = (userId, followId) => async (dispatch) => {
  try {
    await api.followUser(userId, followId);
    dispatch({ type: FOLLOW_USER, payload: followId });
  } catch (error) {
    console.log(error.message);
  }
};

export const unfollowUser = (userId, unfollowId) => async (dispatch) => {
  try {
    await api.unfollowUser(userId, unfollowId);
    dispatch({ type: UNFOLLOW_USER, payload: unfollowId });
  } catch (error) {
    console.log(error.message);
  }
};
