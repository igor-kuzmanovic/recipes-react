import jwt_decode from "jwt-decode";
import api from "../../apis/api";
import {
    CONFIRM_SIGNUP_REQUEST,
    CONFIRM_SIGNUP_SUCCESS,
    CONFIRM_SIGNUP_FAILURE
} from "../../constants/actionTypes";

export function loading() {
    return { type: CONFIRM_SIGNUP_REQUEST };
}

export function success(payload) {
    return { type: CONFIRM_SIGNUP_SUCCESS, payload };
}

export function error(payload) {
    return { type: CONFIRM_SIGNUP_FAILURE, payload };
}

export const confirmRegistration = (formValues, callback) => async dispatch => {
    dispatch(loading());
    try {
        const response = await api.post("/confirm_registration", formValues);
        dispatch(success(jwt_decode(response.data.token)));
        localStorage.setItem("token", response.data.token);
        callback();
    } catch (err) {
        dispatch(error(err));
    }
};

export function reset() {
    return dispatch => {
        dispatch(error(null));
    };
}
