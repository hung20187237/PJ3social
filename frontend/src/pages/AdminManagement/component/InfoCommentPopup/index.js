import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import {
    ButtonSubmit,
    DivFooter,
    ModalCustom,
} from "../../../../pages/searchRestaurant/Component/Post/styles";
import {Col, Row} from "antd";
import {ReportContainer} from "../../../../components/post/styled";

const InfoCommentModal = ({ title, visible, onCancel, onsubmit, commentId }) => {
    const [comments, setComments] = useState({});

    useEffect(() => {
        const fetchComments = async () => {
            const res = await axios.get("http://localhost:8800/api/comment/" + commentId);
            setComments(res.data);
        };
        if (commentId) {
            fetchComments();
        }
    }, [commentId]);

    console.log('commentId', commentId)

    return (
        <ModalCustom
            width={'800px'}
            title={title}
            open={visible}
            onCancel={onCancel}
            footer={
                <DivFooter>
                    <ButtonSubmit
                        onClick={() => {
                            onsubmit();
                            onCancel();
                        }}
                    >
                        Check Report
                    </ButtonSubmit>
                    <ButtonSubmit
                        onClick={() => {
                            onCancel();
                        }}
                    >
                        Đóng
                    </ButtonSubmit>
                </DivFooter>
            }
        >
            <ReportContainer>
                <h3>
                    Nội dung Comment
                </h3>
                <Row>
                    <Col span={4}>
                        UserId:
                    </Col>
                    <Col span={20}>
                        {comments.userId}
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        Vấn đề:
                    </Col>
                    <Col span={20}>
                        jkshkjahsdkj
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        Content:
                    </Col>
                    <Col span={20}>
                        {comments.desc}
                    </Col>
                </Row>
            </ReportContainer>
        </ModalCustom>
    );
};

export default InfoCommentModal;
