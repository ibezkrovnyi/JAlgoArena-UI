import {ActionTypes} from '../../constants/ActionTypes';
import Problem from '../domain/Problem';

export interface EditorState {
  sourceCode: string | null;
  submissionId: string | null;
}

export type ChangeSourceCodeAction = {
  type: ActionTypes.CHANGE_SOURCE_CODE;
  sourceCode?: string;
  submissionId?: string;
}

export function editor(
  state: EditorState = {
    sourceCode: null,
    submissionId: null,
  },
  action: EditorAction,
): EditorState {
  switch (action.type) {
    case ActionTypes.CHANGE_SOURCE_CODE:
      return Object.assign({}, state, {
        sourceCode: action.sourceCode,
      });

    case ActionTypes.SET_CURRENT_PROBLEM:
    case ActionTypes.PROBLEM_REFRESH:
      return Object.assign({}, state, {
        sourceCode: null,
        submissionId: null,
      });

    case ActionTypes.SUBMISSION_PUBLISHED:
      return Object.assign({}, state, {
        submissionId: action.submissionId,
      });

    default:
      return state;
  }
}

export interface ProblemsState {
  items: Problem[];
  currentProblemId: string | null;
  difficultyFilter: number;
  doneProblemsFilter: boolean;
}

export interface ProblemsAction {
  type: string;
  problems?: Problem[];
  problemId?: string;
  level?: number;
  hideDoneProblems?: boolean;
}

export function problems(
  state: ProblemsState = {
    items: [],
    currentProblemId: null,
    difficultyFilter: 0,
    doneProblemsFilter: false,
  },
  action: ProblemsAction,
): ProblemsState {
  switch (action.type) {
    case ActionTypes.FETCH_PROBLEMS_SUCCESS:
      return Object.assign({}, state, {
        items: action.problems,
      });

    case ActionTypes.SET_CURRENT_PROBLEM:
      return Object.assign({}, state, {
        currentProblemId: action.problemId,
      });

    case ActionTypes.SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        difficultyFilter: action.level,
      });

    case ActionTypes.HIDE_DONE_PROBLEMS:
      return Object.assign({}, state, {
        doneProblemsFilter: action.hideDoneProblems,
      });

    default:
      return state;
  }
}
