// @flow

import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import FontAwesome from '../../common/components/FontAwesome';
import store from '../../common/store';
import {setCurrentProblem} from '../actions';

const problemStyle = {
    margin: "20px 20px 0px",
    borderRadius: 5,
    border: "1px solid #c2c7d0",
    padding: "1em 2em 1em"
};

function difficulty(level: number) {
    switch (level) {
        case 3:
            return 'Hard';
        case 2:
            return 'Medium';
        default:
            return 'Easy';
    }
}

const Problem = ({title, id, solvedBy, level, isSuccess, isFailure}:
    {title: string, id: string, solvedBy: number, level: number, isDone: boolean}) => {

    const checkControl = isSuccess
        ? <FontAwesome prefix="fas" name="check"/>
        : isFailure
            ? <FontAwesome prefix="fas" name="times"/>
            : null;

    const successOrDangerStyle = isSuccess
        ? "text-success"
        : isFailure
            ? "text-danger"
            : "text-success";

    return (
        <Col md={5} style={problemStyle}>
            <Row>
                <h4 className={successOrDangerStyle}>{title} <span className="pull-right">{checkControl}</span></h4>
            </Row>
            <Row>
                <LinkContainer to={{pathname: `/problem/${id}`}}>
                    <Button bsStyle="success" className="pull-right"
                            onClick={() => store.dispatch(setCurrentProblem(id))}>
                        <FontAwesome prefix="fas" name="bars"/> Solve Problem
                    </Button>
                </LinkContainer>

                <span className="text-muted">{"Difficulty: "}</span>
                <span className="text-primary">{difficulty(level)}</span><br />
                <span className="text-muted">{"Solved By: "}</span>
                <span className="text-primary">
                    {`${solvedBy} user${solvedBy === 1 ? "" : "s"}`}
                </span>
            </Row>
        </Col>
    );
};

export default Problem;
