import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import Rightbar from "../../components/rightbar/Rightbar";
import "./SearchRes.css";
import Post from "../../components/post/Post";
import { Context } from "../../context/Context";
import axios from "axios";
import { useParams } from "react-router";

export default function SearchPost(username) {
  const [restaurant, setRestaurant] = useState('');
  const { user } = useContext(Context);
  const { resId } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:8800/api/restaurant/" + resId);
      setRestaurant(res.data);
    };
    fetchPosts();
  }, []);
  console.log(restaurant);
  return (
    <>
      <Topbar />
      <div className="newfeedContainer">
        <Sidebar />
        <div className="bodyNewFeed">
        {/* {posts && <Post key={posts._id} post={posts} user1={user} />} */}
        {restaurant.name}
        </div>
        <Rightbar />
      </div>
    </>
  );
}
