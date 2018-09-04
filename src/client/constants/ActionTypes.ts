import { ActionCreatorsMapObject } from "redux";

export enum ActionTypes {
  UPDATE_CONFIG = 'UPDATE_CONFIG',
  JUDGE_REQUEST = 'JUDGE_REQUEST',
  SUBMISSION_PUBLISHED = 'SUBMISSION_PUBLISHED',
  FETCH_PROBLEMS_REQUEST = 'FETCH_PROBLEMS_REQUEST',
  FETCH_PROBLEMS_SUCCESS = 'FETCH_PROBLEMS_SUCCESS',
  FETCH_SUBMISSIONS = 'FETCH_SUBMISSIONS',
  FETCH_SUBMISSIONS_STATS = 'FETCH_SUBMISSIONS_STATS',
  FETCH_PROBLEM_RANKING = 'FETCH_PROBLEM_RANKING',
  START_RANKING_REFRESH = 'START_RANKING_REFRESH',
  RANKING_REFRESH_FINISHED = 'RANKING_REFRESH_FINISHED',
  FETCH_RANKING = 'FETCH_RANKING',
  FETCH_PREVIOUS_RANKING = 'FETCH_PREVIOUS_RANKING',
  FETCH_RANKING_START_DATE = 'FETCH_RANKING_START_DATE',
  FETCH_PROBLEMS_SOLUTION_RATIO = 'FETCH_PROBLEMS_SOLUTION_RATIO',
  PROBLEM_REFRESH = 'PROBLEM_REFRESH',
  SET_CURRENT_PROBLEM = 'SET_CURRENT_PROBLEM',
  CHANGE_SOURCE_CODE = 'CHANGE_SOURCE_CODE',
  HIDE_DONE_PROBLEMS = 'HIDE_DONE_PROBLEMS',
  SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER = 'SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER',
  SET_SUBMISSIONS_FILTER = 'SET_SUBMISSIONS_FILTER',
  SIGNUP_REQUEST = 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_FAIL = 'SIGNUP_FAIL',
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  CHECKED_SESSION_STATUS = 'CHECKED_SESSION_STATUS',
  FETCH_USERS = 'FETCH_USERS',
  NAVIGATE_AWAY_FROM_AUTH_FORM = 'NAVIGATE_AWAY_FROM_AUTH_FORM',
  SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE',
  RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE',
  WEBSOCKET_CONNECTED = 'WEBSOCKET_CONNECTED',
}

// for action creators: disables widening of 'type' property
export function createAction<T extends { type: ActionTypes }>(d: T): T {
  return d;
}

// export type ReturnTypeOfAction<T extends (...args: any[]) => any> = T extends (...args: any[]) => (dispatch?: any, getState?: any) => infer R ?
//   R :
//   ReturnType<T>;

export type ReturnTypeOfAction<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ?
R extends { type: ActionTypes } ? R: never
: never;

export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnTypeOfAction<T[keyof T]>;

export type ActionByType<TActionUnion, TActionType> = TActionUnion extends { type: TActionType } ? TActionUnion : never;