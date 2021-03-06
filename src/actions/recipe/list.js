import api from "../../apis/api";
import {
    FETCH_RECIPES_REQUEST,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_ERROR
} from "../../constants/actionTypes";

export function loading() {
    return { type: FETCH_RECIPES_REQUEST };
}

export function success(payload) {
    return { type: FETCH_RECIPES_SUCCESS, payload };
}

export function error(payload) {
    return { type: FETCH_RECIPES_ERROR, payload };
}

export const fetchRecipes = () => async dispatch => {
    dispatch(loading());
    try {
        const response = await api.get("/recipes");
        dispatch(success(response.data));
    } catch (err) {
        dispatch(error(err));
    }
};

export function reset() {
    return dispatch => {
        dispatch(error(null));
    };
}
