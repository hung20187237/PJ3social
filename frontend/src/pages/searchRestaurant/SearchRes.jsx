import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import Rightbar from "../../components/rightbar/Rightbar";
import RoomIcon from "@mui/icons-material/Room";
import "./SearchRes.css";
import Post from "../../components/post/Post";
import { Context } from "../../context/Context";
import axios from "axios";
import { useParams } from "react-router";

export default function SearchPost(username) {
  const [restaurant, setRestaurant] = useState("");
  const [post, setPost] = useState();
  const { user } = useContext(Context);
  const { resId } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/restaurant/" + resId
      );
      setRestaurant(res.data);
    }
    fetchPosts();
  }, []);
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const postRes = await axios.get(
  //       "http://localhost:8800/api/restaurant/reviewposts/" + resId
  //     );
  //     setPost(postRes.data);
  //   };
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:8800/api/post/" + '630737ca8559748a25ad23ba');
      setPost(res.data);
    };
    fetchPosts();
  }, [restaurant]);
  console.log(restaurant);
  console.log(post);
  return (
    <>
      <Topbar />
      <div className="newfeedContainer">
        <Sidebar />
        <div className="bodyNewFeed">
          <div className="Place_resTop__1xCCM">
            <h1>{restaurant.name}</h1>
            <div class="Place_address__2xVBb" id="galery">
              <p class="Place_intro__2uQsk">
                Góc vườn nhỏ xanh mướt chill chill
              </p>
              <div>
                  <RoomIcon htmlColor="green" className="reviewIcon" />
                  <span>{'place'}</span>
                </div>
            </div>
          </div>
          {post && <Post key={post._id} post={post} user1={user} />}
        </div>
        <Rightbar />
      </div>
    </>
  );
}
