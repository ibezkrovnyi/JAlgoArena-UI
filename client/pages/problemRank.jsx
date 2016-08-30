import React from 'react';
import {Grid, Col, Table, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import UserProblemRank from '../components/UserProblemRank';
import {fetchProblemRanking} from "../actions/index";

class ProblemRank extends React.Component {

    componentDidMount() {
        this.props.onLoad(this.props.params.id);
    }

    render() {

        let ranking = this.props.ranking.map ? this.props.ranking : [];

        let rankNodes = ranking.map((ranking, idx) =>
            <UserProblemRank key={idx} idx={idx} hacker={ranking.hacker} score={ranking.score} elapsedTime={ranking.elapsed_time} />
        );

        return (
            <Grid>
                <Col mdOffset={3} md={6}>
                    <PageHeader>Problem Ranking - {this.props.params.id}</PageHeader>
                    <Table striped bordered condensed hover responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Hacker</th>
                            <th>Score</th>
                            <th>Elapsed Time (ms)</th>
                        </tr>
                        </thead>
                        <tbody>
                            {rankNodes}
                        </tbody>
                    </Table>
                </Col>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userAuthSession: state.userAuthSession,
        ranking: state.problemRanking
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (problemId) => {
            dispatch(fetchProblemRanking(problemId));
        }
    }
};

const ProblemRankPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProblemRank);

export default ProblemRankPage;
