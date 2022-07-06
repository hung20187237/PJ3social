import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import ImageSlider from "../slider1/ImageSlider";
import { SliderData } from '../slider1/SliderData';
import "./Feed.css";
import axios from "axios";
import { Context } from "../../context/Context";
import SliderSlick from "../slider2/SliderSlick"
import Catology from "../catology/Catology";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(Context);

  //lay tat ca bai dang hoac bai dang cua nguoi dung
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("http://localhost:8800/api/post/profile/" + username)
        : await axios.get("http://localhost:8800/api/post/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <SliderSlick/>
        <ImageSlider/>
        <Catology/>
      </div>
    </div>
  );
}