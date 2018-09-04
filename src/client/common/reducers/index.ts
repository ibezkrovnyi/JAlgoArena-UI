import * as redux from 'redux';
import {ActionTypes} from '../../constants/ActionTypes';
import {editor, EditorState, EditorAction, problems, ProblemsState, ProblemsAction} from '../../problems/reducers/index';
import {auth, AuthState, AuthAction} from '../../users/reducers/index';
import {ranking, RankingState, RankingAction} from '../../ranking/reducers/index';
import {submissions, SubmissionsState, SubmissionsAction} from '../../submissions/reducers/index';
import { LOCATION_CHANGE } from 'connected-react-router';

interface ConfigAction {
    type: string;
    isConnected?: boolean;
    error?: string;
    config?: { title: string; emailRegex: string; emailErrorMessage: string; teams: string[]; regions: string[] };
}

export interface Config {
    title: string
    emailRegex: string
    emailErrorMessage: string
    teams: Array<string>
    regions: Array<string>
}

export interface AppState {
    editor: EditorState
    problems: ProblemsState
    auth: AuthState
    submissions: SubmissionsState
    ranking: RankingState
    errorMessage: string | undefined | null
    webSocketConnected: boolean
    config: Config
}

export type Action =
  | EditorAction
  | ProblemsAction
  | AuthAction
  | SubmissionsAction
  | RankingAction
  | ErrorMessageAction
  | ConfigAction

const rootReducer = redux.combineReducers<AppState, Action>({
  editor,
  problems,
  auth,
  submissions,
  ranking,
  errorMessage,
  webSocketConnected,
  config,
});

export function webSocketConnected(state: boolean = false, action: ConfigAction) {
  switch (action.type) {
    case ActionTypes.WEBSOCKET_CONNECTED:
      return action.isConnected;
    default:
      return state;
  }
}

export function config(
  state: {} = {
    title: 'Start to solve your first problem',
    emailRegex: '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
    emailErrorMessage: 'Please enter a valid email address',
    teams: ['Team A', 'Team B', 'Team C'],
    regions: ['Kraków', 'Wrocław'],
  },
  action: ConfigAction,
) {
  switch (action.type) {
    case ActionTypes.UPDATE_CONFIG:
      return action.config;
    default:
      return state;
  }
}

type ErrorMessageState = string | null;

interface ErrorMessageAction {
  type: string
  error: string | null
}

export function errorMessage(
    state: ErrorMessageState | undefined = null,
    action: ErrorMessageAction
) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE || type === LOCATION_CHANGE) {
    return null;
  } else if (error) {
    return error;
  }

  return state;
}

export {rootReducer};
