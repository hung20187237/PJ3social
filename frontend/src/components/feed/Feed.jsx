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