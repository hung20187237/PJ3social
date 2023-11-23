import "./ClosePlace.css";
import BasicRating from "../star/star";
import { useNavigate } from "react-router-dom";

export default function ClosePlace({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let navigate = useNavigate();

  const handleClickSearch = async (value) => {
    navigate(`/searchPost/${value}`);
  };
  return (
    <li className="rightbarPlace" onClick={() => {
      handleClickSearch(post._id)
    }}>
      <img
        className="rightbarPlaceImg"
        src={PF + post.img[0]}
        alt={post.title}
      />
      <div>
        <span className="rightbarPlaceName">{post.title}</span>
        <span className="rightbarPlaceLocation">{post.place}</span>
        <div>
          <BasicRating rating={post.rating} />
        </div>
      </div>
    </li>
  );
}
