import React from 'react';
import {Modal} from 'react-bootstrap';
import AceEditor from 'react-ace';

import 'brace/theme/chrome';
import logo from '../../assets/img/logo.png';

const logoStyle = {
    height: 50,
    marginBottom: 15
};

const modalBodyStyle = {
    height: 200
};

const ListNodeSourceCode = ({show, onHide}: {show: boolean, onHide: () => void}) => (
    <Modal show={show || false} onHide={onHide}>
        <Modal.Header closeButton>
            <h2>{"ListNode"}</h2>
        </Modal.Header>
        <Modal.Body style={modalBodyStyle}>
            <AceEditor
                mode="java"
                theme="chrome"
                value={`public class ListNode {
    public int value;
    public ListNode next;

    public ListNode(int value) {
        this.value = value;
    }
}`}
                height="160px"
                width="100%"
                readOnly={true}
                fontSize={14}
                editorProps={{$blockScrolling: true}}
            />
        </Modal.Body>
        <Modal.Footer>
            <div className="col-md-offset-4 col-md-4">
                <img src={logo} className="img-responsive" style={logoStyle} />
            </div>
        </Modal.Footer>
    </Modal>
);

export default ListNodeSourceCode;