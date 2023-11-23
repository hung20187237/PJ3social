import React from 'react';
import {Modal} from "antd";

const ModalReview = ({visible, onSubmit, onCancel}) => {
    console.log(visible)
    return (
        <Modal title="Basic Modal" open={visible} onOk={onSubmit} onCancel={onCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
};

export default ModalReview;