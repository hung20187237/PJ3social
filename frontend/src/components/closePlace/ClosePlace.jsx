import "./ClosePlace.css";
import BasicRating from "../star/star";


export default function ClosePlace({post}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbarPlace">
      <img className="rightbarPlaceImg" src={PF+post.img[0]} alt={post.title} />
      <div>
        <span className="rightbarPlaceName">{post.title}</span>
        <span className="rightbarPlaceLocation">{post.place}</span>
        <div>
          <BasicRating rating={post.rating}/>
        </div>
      </div>
    </li>
  );
}
