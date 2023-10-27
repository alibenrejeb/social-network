import { GET_USER, UPDATE_BIO, UPDATE_PICTURE } from "../constants/actionTypes";
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
