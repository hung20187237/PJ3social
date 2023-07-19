import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import Rightbar from "../../components/rightbar/Rightbar";
import "./SearchPost.css"
import Post from "../../components/post/Post";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Newfeed(username) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(Context);

    useEffect(() => {
        const fetchPosts = async () => {
         
          const res = await axios.get("http://localhost:8800/api/post/timeline/" + user._id);
          setPosts(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        };
        fetchPosts();
      }, [username, user._id]);
  return (
    <>
      <Topbar />
      <div className="newfeedContainer">
        <Sidebar />
        <div className="bodyNewFeed">
          {posts.map((p) => {
              return (
              <Post key={p._id} post={p} user1 = {user}  />
              )
          })}
        </div>
        <Rightbar/>
      </div>
    </>
  );
}