import React from 'react';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Problem from '../components/Problem';
import ProblemsFilter from '../components/ProblemsFilter';
import {setProblemsDifficultyVisibilityFilter, hideDoneProblems} from "../actions/index";
import {fetchSolvedProblemsRatio} from "../../ranking/actions/index";
import {Submission} from "../../submissions/domain/Submission";

class Problems extends React.Component {

    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        const {
            problems,
            problemsFilter,
            submissions,
            hideDoneProblems,
            changeFilter,
            onHideDoneProblems
        } = this.props;

        let problemNodes = _.orderBy(problems, ['solutionsCount'], ['desc'])
            .map((problem, idx) => {

                let acceptedSubmissions = _.filter(submissions,
                    (submission: Submission) => submission.statusCode === 'ACCEPTED'
                );
                let failedSubmissions = _.filter(submissions,
                    (submission: Submission) => submission.statusCode !== 'ACCEPTED'
                );

                let submittedAcceptedProblems = _.map(acceptedSubmissions, (submission) => submission.problemId);
                let submittedFailedProblems = _.map(failedSubmissions, (submission) => submission.problemId);

                const isSuccess = _.includes(submittedAcceptedProblems, problem.id);
                const isFailure = _.includes(submittedFailedProblems, problem.id);

                if (hideDoneProblems && isSuccess) return null;
                if (problemsFilter !== 0 && problem.level !== problemsFilter) return null;

                return <Problem
                    title={problem.title}
                    level={problem.level}
                    solvedBy={problem.solutionsCount}
                    id={problem.id}
                    key={idx}
                    submissions={submissions}
                    isSuccess={isSuccess}
                    isFailure={isFailure}
                />;
        });

        return <Grid>
            <ProblemsFilter
                changeFilter={changeFilter}
                filter={problemsFilter}
                onHideDoneProblems={onHideDoneProblems}
                hideDoneProblems={hideDoneProblems}
            />
            <ReactCSSTransitionGroup transitionName="problems-filter" transitionEnterTimeout={600} transitionLeaveTimeout={600}>
                {problemNodes}
            </ReactCSSTransitionGroup>
        </Grid>;
    }
}

const mapStateToProps = (state) => {

    let problems = state.problems.items || [];

    problems = problems.map(problem => {
        let solvedProblemRatio = state.submissions.problemsSolutionsRatio.find(
            ratio => ratio.problemId === problem.id
        );
        return Object.assign({}, problem, {
            solutionsCount: solvedProblemRatio && solvedProblemRatio.solutionsCount || 0})
    });

    return {
        problems,
        submissions: state.submissions.items,
        problemsFilter: state.problems.difficultyFilter,
        hideDoneProblems: state.problems.doneProblemsFilter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(fetchSolvedProblemsRatio());
        },
        changeFilter: (level) => {
            dispatch(setProblemsDifficultyVisibilityFilter(level));
        },
        onHideDoneProblems: (value) => {
            dispatch(hideDoneProblems(value));
        }
    }
};

const ProblemsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Problems);

export default ProblemsPage;