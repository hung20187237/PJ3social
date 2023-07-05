import "./Review.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CancelIcon from "@mui/icons-material/Cancel";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Topbar from "../../components/topbar/Topbar";
import BasicRating from "../../components/star/star";
import { Editor } from "@tinymce/tinymce-react";
import FbImageLibrary from "react-fb-image-grid";
import SelectFloat from "../../components/FloatingLabel/SelectFloat";
import { SliderSlickData } from "../../components/slider2/SliderSlickData";
import { SliderData } from "../../components/slider1/SliderData";
import { CatologyData } from "../../components/catology/CatologyData";

export default function Review() {
  const { user } = useContext(Context);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const title = useRef();
  const rating = useRef(4);
  const place = useRef();
  const [mutifile, setMutifile] = useState("");
  const [mutiupload, setMutiupload] = useState(null);
  const [filterValue, setFilterValue] = useState({ kv: [], tc: [], dm: [] });
  const [files, setFiles] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.getContent(),
      title: title.current.value,
      rating: rating.current,
      place: place.current.value,
      tagkv: filterValue.kv,
      tagtc: filterValue.tc,
      tagdm: filterValue.dm,
    };
    if (mutifile) {
      const data = new FormData();
      let fileName = [];
      [...mutifile].map((file) => data.append("images", file));

      console.log(newPost);
      try {
        await axios
          .post("http://localhost:8800/api/mutiupload", data)
          .then((res) => res.data)
          .then((data) =>
            data.file.map((file) => fileName.push(file.filename))
          );
        newPost.img = Object.values(fileName);
      } catch (err) {}
    }
    try {
      await axios.post("http://localhost:8800/api/post", newPost);
      window.location.reload();
    } catch (err) {}
  };

  const log = (e) => {
    e.preventDefault();
    if (desc.current) {
      console.log(desc.current.getContent());
    }
  };

  const MutipleFileChange = (files) => {
    const listImg = Object.values(files);
    const listUrl = listImg.map((img) => URL.createObjectURL(img));
    console.log(listImg);
    setFiles(files);
    setMutifile(listImg);
    setMutiupload(listUrl);
  };

  return (
    <div className="review">
      <Topbar />
      <div className="reviewWrapper">
        <div className="headerReview">
          <span className="textContent">Viết Review</span>
          <hr className="reviewHr" />
        </div>
        <div className="bodyReview">
          <div className="reviewLeft">
            <div className="starRating">
              <h2>Xếp hạng của bạn :</h2>
              <BasicRating ref={rating} />
            </div>

            <div className="reviewTop">
              <h2>Đánh Giá của bạn :</h2>
              <div className="reviewcomment">
                <Editor
                  onInit={(evt, editor) => (desc.current = editor)}
                  initialValue={"What's in your mind " + user.username + "?"}
                  init={{
                    height: 400,
                    width: "100%",
                    menubar: false,
                    plugins: [
                      "a11ychecker",
                      "advlist",
                      "advcode",
                      "advtable",
                      "autolink",
                      "checklist",
                      "export",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "powerpaste",
                      "fullscreen",
                      "formatpainter",
                      "insertdatetime",
                      "media",
                      "table",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | casechange blocks | bold italic backcolor forecolor | " +
                      "alignleft aligncenter alignright alignjustify | " +
                      "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>
            </div>
            <hr className="reviewHr" />
            {mutiupload && (
              <div className="reviewImgContainer">
                {<FbImageLibrary images={mutiupload} countFrom={5} />}
                <CancelIcon
                  className="reviewCancelImg"
                  onClick={() => setMutiupload(null)}
                />
              </div>
            )}
            <form className="reviewBottom" onSubmit={submitHandler}>
              <div className="reviewOptions">
                <label htmlFor="file" className="reviewOption">
                  <PermMediaIcon htmlColor="tomato" className="reviewIcon" />
                  <span className="reviewOptionText">Photo or Video</span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    name="imglist"
                    multiple
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => {
                      console.log(e.target.files);
                      MutipleFileChange(e.target.files);
                    }}
                  />
                </label>
                <div className="reviewOption">
                  <LocalOfferIcon htmlColor="blue" className="reviewIcon" />
                  <span className="reviewOptionText">Tag</span>
                </div>
                <div className="reviewOption">
                  <RoomIcon htmlColor="green" className="reviewIcon" />
                  <span className="reviewOptionText">Location</span>
                </div>
                <div className="reviewOption">
                  <EmojiEmotionsIcon
                    htmlColor="goldenrod"
                    className="reviewIcon"
                  />
                  <span className="reviewOptionText">Feelings</span>
                </div>
              </div>
              <button
                // onClick={log}
                className="reviewButton"
                type="submit"
                style={{ width: "150px" }}
              >
                Share
              </button>
            </form>
          </div>
          <div className="reviewRight">
            <form className="reviewBox">
              <h2>Thông tin địa điểm :</h2>
              <input
                placeholder="Tên"
                type=""
                required
                className="reviewInput"
                ref={title}
              />
              <input
                placeholder="Địa điểm"
                type="location"
                required
                className="reviewInput"
                ref={place}
              />
              <div className="reviewInput">
                <SelectFloat
                  dataSelect={SliderSlickData}
                  label={"Khu vực"}
                  valueSelect={filterValue.kv}
                  onChangeSelect={(value) => {
                    setFilterValue({ ...filterValue, kv: value });
                  }}
                />
              </div>
              <div className="reviewInput">
                <SelectFloat
                  dataSelect={SliderData}
                  label={"Tiêu chí"}
                  valueSelect={filterValue.tc}
                  onChangeSelect={(value) => {
                    setFilterValue({ ...filterValue, tc: value });
                  }}
                />
              </div>
              <div className="reviewInput">
                <SelectFloat
                  dataSelect={CatologyData}
                  label={"Danh mục"}
                  valueSelect={filterValue.dm}
                  onChangeSelect={(value) => {
                    setFilterValue({ ...filterValue, dm: value });
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
