// @flow
type Action = {type:string, isConnected?: boolean, error?: string}

import * as redux from 'redux';
import {routerReducer} from 'react-router-redux';
import * as types from "../../constants/ActionTypes";

import {editor, problems} from "../../problems/reducers";
import {auth} from "../../users/reducers";
import {ranking} from "../../ranking/reducers";
import {submissions} from "../../submissions/reducers";

const rootReducer = redux.combineReducers({
    editor,
    problems,
    showModal,
    routing: routerReducer,
    auth,
    submissions,
    ranking,
    errorMessage,
    webSocketConnected
});

export function webSocketConnected(state: boolean = false, action: Action) {
    switch (action.type) {
        case types.WEBSOCKET_CONNECTED:
            return action.isConnected;
        default:
            return state;
    }
}

export function showModal(state: boolean = false, action: Action) {

    if (action.error) {
        return false;
    }

    switch (action.type) {
        case types.SIGNUP_REQUEST:
        case types.LOGIN_REQUEST:
        case types.JUDGE_REQUEST:
        case types.FETCH_PROBLEMS_REQUEST:
            return true;
        case types.SET_CURRENT_PROBLEM:
        case types.FETCH_PROBLEMS_SUCCESS:
        case types.SUBMISSION_PUBLISHED:
        case types.FETCH_SUBMISSIONS:
        case types.FETCH_RANKING:
        case types.CHECKED_SESSION_STATUS:
        case types.LOGIN_FAIL:
        case types.LOGIN_SUCCESS:
        case types.LOGOUT_SUCCESS:
        case types.SIGNUP_FAIL:
        case types.SIGNUP_SUCCESS:
        case types.CLOSE_WORK_IN_PROGRESS_WINDOW:
        case types.SET_ERROR_MESSAGE:
            return false;
        default:
            return state;
    }
}

export function errorMessage(state: ?string = null, action: {type:string, error: ?string}) {
    const { type, error } = action;

    if (type === types.RESET_ERROR_MESSAGE) {
        return null;
    } else if (error) {
        return error;
    }

    return state;
}

export default rootReducer;