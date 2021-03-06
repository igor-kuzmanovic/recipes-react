import api from "../../apis/api";
import {
    FETCH_CATEGORY_REQUEST,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_ERROR
} from "../../constants/actionTypes";

export function loading() {
    return { type: FETCH_CATEGORY_REQUEST };
}

export function success(payload) {
    return { type: FETCH_CATEGORY_SUCCESS, payload };
}

export function error(payload) {
    return { type: FETCH_CATEGORY_ERROR, payload };
}

export const fetchCategory = id => async dispatch => {
    dispatch(loading());
    try {
        const response = await api.get(`/categories/${id}`);
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
