import { Submission } from '../domain/Submission';
import { ActionTypes, createAction, ActionUnion } from '../../constants/ActionTypes';
import { JudgeRequest } from '../domain/JudgeRequest';
import Problem from '../domain/Problem';
import { Dispatch } from "redux";

interface Action {
  type: string
  submissionId?: string
  sourceCode?: string
  problemId?: string
  problems?: Array<Problem>
  level?: number
  hideDoneProblems?: boolean
  error?: string
}

export const actionCreators = {
  startJudge: () => createAction({
    type: ActionTypes.JUDGE_REQUEST,
  }),
  judgeCode: (sourceCode: string, problemId: string, userId: string, token: string) => {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },

      method: 'post',
      body: JSON.stringify(new JudgeRequest(sourceCode, userId)),
    };

    return (dispatch: Dispatch<Action>) => {
      return fetch(`/api/queue/api/problems/${problemId}/publish`, options)
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            dispatch(actionCreators.setErrorMessage('Cannot connect to Queue Service: \n' + JSON.stringify(json.error)));
          } else {
            dispatch(actionCreators.submissionPublished(json as Submission));
          }
        })
        .catch((error) => console.log(`[err] POST /api/queue/api/problems/${problemId}/publish:` + error));
    };
  },
  submissionPublished: (result: Submission) => createAction({
    type: ActionTypes.SUBMISSION_PUBLISHED,
    submissionId: result.submissionId,
  }),

  changeSourceCode: (newValue: string) => createAction({
    type: ActionTypes.CHANGE_SOURCE_CODE,
    sourceCode: newValue,
  }),

  problemRefresh: () => createAction({
    type: ActionTypes.PROBLEM_REFRESH,
  }),

  setCurrentProblem: (problemId: string) => createAction({
    type: ActionTypes.SET_CURRENT_PROBLEM,
    problemId,
  }),

  setProblemsDifficultyVisibilityFilter: (level: number) => createAction({
    type: ActionTypes.SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER,
    level,
  }),

  hideDoneProblems: (value: boolean) => createAction({
    type: ActionTypes.HIDE_DONE_PROBLEMS,
    hideDoneProblems: value,
  }),

  fetchProblems() {
    const options = {
      headers: {
        Accept: 'application/json',
      },

      method: 'get',
    };

    return (dispatch: Dispatch<Action>) => {
      return fetch(`/api/judge/api/problems`, options)
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            dispatch(actionCreators.setErrorMessage('Cannot connect to Judge Service: \n' + JSON.stringify(json.error)));
          } else {
            dispatch(actionCreators.setProblems(json as Problem[]));
          }
        })
        .catch((error) => console.log(`[err] GET /api/judge/api/problems:` + error));
    };
  },

  setProblems: (problems: Problem[]) => createAction({
    type: ActionTypes.FETCH_PROBLEMS_SUCCESS,
    problems,
  }),

  startFetchingProblems: () => createAction({
    type: ActionTypes.FETCH_PROBLEMS_REQUEST,
  }),

  setErrorMessage: (error: string) => createAction({
    type: ActionTypes.SET_ERROR_MESSAGE,
    error: error,
  }),
}

export type ProblemsAction = ActionUnion<typeof actionCreators>;
