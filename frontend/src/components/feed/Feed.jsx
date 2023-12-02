import ImageSlider from "../slider1/ImageSlider";
import PostSuggest from "../suggestPost/index";
import "./Feed.css";
import SliderSlick from "../slider2/SliderSlick"
import Catology from "../catology/Catology";

export default function Feed({ username }) {


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