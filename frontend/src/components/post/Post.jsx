import "./Post.css";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SendIcon from "@mui/icons-material/Send";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import BasicStar from "../starone/star";
import BasicRating from "../../components/star/star";
import RoomIcon from "@mui/icons-material/Room";
import ReactImageGrid from "@cordelia273/react-image-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplyIcon from "@mui/icons-material/Reply";

export default function Post({ post, user1 }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [currentPost, setCurrentPost] = useState(post);
  const [likes, setLikes] = useState(post.likes.length);
  const [saved, setSaved] = useState(post.saveposts.length);
  const [comments, setComments] = useState([]);
  const [commentusers, setCommentUsers] = useState([]);
  const [replyusers, setReplyUsers] = useState([]);
  const [replycomment, setReplyComment] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [commentComponent, setCommentComponent] = useState(false);
  const [user, setUser] = useState({});
  const [more, setMore] = useState(false);
  const { user: currentUser, notifyFlag, dispatch } = useContext(Context);
  const comment = useRef();
  const reply = useRef();
  const body = post.desc;
  const listUrl = post.img.map((img) => PF + img);
  console.log(listUrl);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, []);

  useEffect(() => {
    setIsSaved(post.saveposts.includes(currentUser._id));
  }, []);

  //lay thong tin nguoi dang bai
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/user?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, []);

  //lay cac comment thuoc bai dang
  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/comment/" + post._id
      );
      const commentsSort = res.data.comments.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      });
      setComments(commentsSort);
      setCommentUsers(res.data.users);
      setReplyUsers(res.data.users);
    };
    fetchComments();
  }, []);

  //xu ly xoa bai dang
  const handlePostDelete = async () => {
    try {
      await axios.delete("http://localhost:8800/api/post/" + post._id, {
        data: { userId: currentUser._id },
      });
      setCurrentPost(null);
    } catch (err) {
      console.log(err);
    }
  };

  //xu ly khi like bai dang
  const handleClickLike = () => {
    try {
      axios.put("http://localhost:8800/api/post/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
    handleLikeNotify();
  };

  //xu ly khi Save bai dang
  const handleClickSave = () => {
    try {
      axios.put("http://localhost:8800/api/post/" + post._id + "/save", {
        userId: currentUser._id,
      });
    } catch (err) {}
    axios.put("http://localhost:8800/api/user/" + user1._id + "/save", {
      postId: post._id,
    });
    setSaved(isSaved ? saved - 1 : saved + 1);
    setIsSaved(!isSaved);
  };

  //xu ly khi Reply comment
  const handleClickReply = async (commentId) => {
    try {
      const respo = await axios.put(
        "http://localhost:8800/api/comment/" + commentId._id + "/reply",
        {
          reply: {
            descreply: reply.current.value,
            userreplyId: currentUser._id,
          },
        }
      );
      setComments(
        comments.map((comment) => {
          return comment === commentId ? (comment = respo.data) : comment;
        })
      );
      setReplyUsers([...replyusers, currentUser]);
      handleReplyCommmentNotify(reply.current.value);
    } catch (err) {}
  };
  //xu ly thong bao
  const handleLikeNotify = () => {
    try {
      const notify = {
        sendUserId: currentUser._id,
        receiveUserId: user._id,
        sendUserName: currentUser.username,
        post: post.desc,
        type: 1,
      };
      axios.post("http://localhost:8800/api/notification", notify);
    } catch (err) {}
    dispatch({ type: "NOTIFICATION", payload: !notifyFlag });
  };

  //xu ly khi comment bai dang
  const handleCommmentSubmit = async () => {
    try {
      const newComment = {
        userId: currentUser._id,
        postId: post._id,
        desc: comment.current.value,
      };
      const res = await axios.post(
        "http://localhost:8800/api/comment",
        newComment
      );
      setComments([res.data, ...comments]);
      setCommentUsers([...commentusers, currentUser]);
      handleCommmentNotify(comment.current.value);
    } catch (err) {
      console.log(err);
    }
  };

  //xu ly thong bao
  const handleCommmentNotify = (comment) => {
    try {
      const notify = {
        sendUserId: currentUser._id,
        receiveUserId: user._id,
        sendUserName: currentUser.username,
        post: comment,
        type: 2,
      };
      axios.post("http://localhost:8800/api/notification", notify);
    } catch (err) {}
    dispatch({ type: "NOTIFICATION", payload: !notifyFlag });
  };

  //xu ly thong bao
  const handleReplyCommmentNotify = (reply) => {
    try {
      const notify = {
        sendUserId: currentUser._id,
        receiveUserId: user._id,
        sendUserName: currentUser.username,
        post: reply,
        type: 5,
      };
      axios.post("http://localhost:8800/api/notification", notify);
    } catch (err) {}
    dispatch({ type: "NOTIFICATION", payload: !notifyFlag });
  };

  //xu ly khi xoa comment
  const handleCommmentDelete = async (deleteComment) => {
    try {
      await axios.delete(
        "http://localhost:8800/api/comment/" + deleteComment._id,
        { data: { userId: currentUser._id } }
      );
      setComments(
        comments.filter((comment) => {
          return comment !== deleteComment;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickMore = () => {
    setMore(!more);
  };

  const MoreContainer = () => {
    return (
      <div className="moremain">
        {isSaved ? (
          <div onClick={handleClickSave}>
            <BasicStar value={1} />
          </div>
        ) : (
          <div onClick={handleClickSave}>
            <BasicStar value={0} />
          </div>
        )}
        <span>Lưu bài viết</span>
      </div>
    );
  };

  const PostCommentComponent = () => {
    return (
      <div className="postComment">
        <div className="postCommentInputWrapper">
          <input
            type="text"
            className="postCommentInput"
            placeholder=" Write your comment ..."
            ref={comment}
          />
          <SendIcon onClick={handleCommmentSubmit} htmlColor="LightSeaGreen" />
        </div>
        <div className="postCommentsWrapper">
          {comments.map((comment) => {
            let user = {};
            for (let i = 0; i < commentusers.length; i++) {
              if (commentusers[i]._id === comment.userId) {
                user = commentusers[i];
              }
            }
            return (
              <>
                <div className="userComments" key={comment._id}>
                  <img
                    src={
                      user.avatar
                        ? PF + user.avatar
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                    className="userCommentImg"
                  />
                  <div className="userCommentNameWraper">
                    <span className="userCommentName">{user.username}</span>
                    <span className="postDate">
                      {format(comment.createdAt)}
                    </span>
                  </div>
                  <div className="userCommentDesc">{comment.desc}</div>
                  {comment.userId === currentUser._id ? (
                    <DeleteForeverIcon
                      onClick={() => {
                        handleCommmentDelete(comment);
                      }}
                      htmlColor="red"
                    />
                  ) : null}
                  {comment.userId !== currentUser._id ? (
                    <ReplyIcon
                      htmlColor="lightseagreen"
                      onClick={() => {
                        setReplyComment(!replycomment);
                      }}
                    />
                  ) : null}
                </div>
                <div className="postCommentsWrapper">
                  {comment.reply.map((rep) => {
                    let userreply = {};
                    for (let i = 0; i < replyusers.length; i++) {
                      if (replyusers[i]._id === rep.userreplyId) {
                        userreply = replyusers[i];
                      }
                    }
                    return (
                      <div className="userReplyComments" key={rep._id}>
                        <img
                          src={
                            userreply.avatar
                              ? PF + userreply.avatar
                              : PF + "person/noAvatar.png"
                          }
                          alt=""
                          className="userCommentImg"
                        />
                        <div className="userCommentNameWraper">
                          <span className="userCommentName">
                            {userreply.username}
                          </span>
                          <span className="postDate">
                            {format(rep.createdAt)}
                          </span>
                        </div>
                        <div className="userCommentDesc">{rep.descreply}</div>
                        {rep.userreplyId === currentUser._id ? (
                          <DeleteForeverIcon
                            onClick={() => {
                              handleCommmentDelete(comment);
                            }}
                            htmlColor="red"
                          />
                        ) : null}
                        {rep.userreplyId !== currentUser._id ? (
                          <ReplyIcon
                            htmlColor="lightseagreen"
                            onClick={() => {
                              setReplyComment(!replycomment);
                            }}
                          />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
                {replycomment && comment.userId !== currentUser._id ? (
                  <div className="postReplyCommentInput">
                    <input
                      type="text"
                      className="postCommentInput"
                      placeholder=" Write your comment ..."
                      ref={reply}
                    />
                    <SendIcon
                      htmlColor="LightSeaGreen"
                      onClick={() => {
                        handleClickReply(comment);
                      }}
                    />
                  </div>
                ) : null}
              </>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="post">
      {currentPost ? (
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user.username}`}>
                <img
                  className="postProfileImg"
                  src={
                    user.avatar ? PF + user.avatar : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
              </Link>
              <div>
                <div>
                  <span className="postUsername">{user.username}</span>
                  <span className="postDate">{format(post.createdAt)}</span>
                  <ArrowRightIcon />
                  <span className="postTitle">{post.title}</span>
                </div>
                <div style={{ margin: "0 10px" }}>
                  <RoomIcon htmlColor="green" className="reviewIcon" />
                  <span>{post.place}</span>
                </div>
                <BasicRating
                  rating={post.rating}
                  style={{ margin: "0 10px" }}
                />
              </div>
            </div>
            <div className="postTopRight">
              <div style={{ padding: "0 10px" }}>
                {post.userId === currentUser._id ? (
                  <DeleteForeverIcon
                    htmlColor="red"
                    onClick={handlePostDelete}
                  />
                ) : null}
              </div>
              <div className="moreIcon" onClick={handleClickMore}>
                <MoreVertIcon />
                {more ? <MoreContainer /> : null}
              </div>
            </div>
          </div>
          <div className="postCenter">
            <div
              className="postText"
              dangerouslySetInnerHTML={{ __html: body }}
            />
            <div className="postcenterimg">
              {post.img && <ReactImageGrid images={listUrl} countFrom={5} />}
            </div>
          </div>

          <div className="postBottom">
            <div className="postBottomLeft">
              {isLiked ? (
                <ThumbUpIcon
                  htmlColor="DodgerBlue"
                  className="likeIcon"
                  onClick={handleClickLike}
                  alt=""
                />
              ) : (
                <ThumbUpIcon
                  htmlColor="gray"
                  className="likeIcon"
                  onClick={handleClickLike}
                  alt=""
                />
              )}
              <span className="postLikeCounter">{likes} people like it</span>
            </div>
            <div className="postBottomRight">
              <span
                className="postCommentText"
                onClick={() => {
                  setCommentComponent(!commentComponent);
                }}
              >
                {comments.length} comments
              </span>
            </div>
          </div>
          {commentComponent ? <PostCommentComponent /> : null}
        </div>
      ) : null}
    </div>
  );
}
