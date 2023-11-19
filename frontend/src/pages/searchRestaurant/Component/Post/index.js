import React, {useEffect, useState} from 'react';
import {PostItem, PostItemLeft} from "../../styles";
import axios from "axios";
import {Link} from "react-router-dom";
import {
    PostItemBody,
    PostItemRight,
    PostItemRightContent,
    PostItemText,
    PostItemTitle,
    PostUserName,
    PostUserVote, ReactImageGridCustom
} from "./styles";
import {format} from "timeago.js";
import ReactImageGrid from "@cordelia273/react-image-grid";

const PostRes = ({post}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const listUrl = post.img.map((img) => PF + img);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(
                `http://localhost:8800/api/user?userId=${post.userId}`
            );
            setUser(res.data);
        };
        fetchUser();
    }, []);

    return (
        <PostItem>
            <PostItemLeft>
                <Link to={`/profile/${user.username}`}>
                    <img
                        className="postProfileImg"
                        src={
                            user.avatar ? PF + user.avatar : PF + "person/noAvatar.png"
                        }
                        alt=""
                    />
                </Link>
            </PostItemLeft>
            <PostItemRight>
                <PostItemRightContent>
                    <PostItemTitle>
                        <PostUserName>
                            <a href={`/profile/${user.username}`}>
                                {user.username}
                            </a>
                            <span className="postDate">{format(post.createdAt)}</span>
                        </PostUserName>
                        <PostUserVote>
                            <span>
                                <b>{post.rating}</b>
                            </span>
                        </PostUserVote>
                    </PostItemTitle>
                    <PostItemBody>
                        <div
                            className="postText"
                            dangerouslySetInnerHTML={{ __html: post.desc }}
                        />
                        <div className="postcenterimg">
                            {post.img && <ReactImageGridCustom images={listUrl} />}
                        </div>
                    </PostItemBody>
                </PostItemRightContent>
            </PostItemRight>
        </PostItem>
    );
};

export default PostRes;