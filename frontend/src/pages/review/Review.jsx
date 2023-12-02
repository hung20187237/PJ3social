import "./Review.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CancelIcon from "@mui/icons-material/Cancel";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/Context";
import {Form, Rate} from "antd";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Topbar from "../../components/topbar/Topbar";
import BasicRating from "../../components/star/star";
import { Editor } from "@tinymce/tinymce-react";
import ReactImageGrid from "@cordelia273/react-image-grid";
import SelectFloat from "../../components/FloatingLabel/SelectFloat";
import { SliderSlickData } from "../../components/slider2/SliderSlickData";
import { SliderData } from "../../components/slider1/SliderData";
import { CatologyData } from "../../components/catology/CatologyData";
import Floating from "../../components/FloatingLabel/Input/index";
import imgTest from "../../images/backgroundLogin.png";
import { FormCustom } from "./styles";
import {ItemVote, TextItemVote} from "../searchRestaurant/Component/Post/styles";
import {mildKeywords, moderateKeywords, severeKeywords} from "./contant";
import axios from 'axios';


export default function Review() {
  const { user } = useContext(Context);
  const [form] = Form.useForm();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const rating = useRef({
    place: 4,
    space: 4,
    food: 4,
    serve: 4,
    price: 4,
  });
  const place = useRef();
  const [mutifile, setMutifile] = useState("");
  const [mutiupload, setMutiupload] = useState(null);
  const [filterValue, setFilterValue] = useState({ kv: [], tc: [], dm: [] });
  const [files, setFiles] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    const resultDesc = desc.current.getContent();
    const newPost = {
      userId: user._id,
      desc: desc.current.getContent(),
      title: value.name,
      rating: rating.current,
      place: value.place,
      tagkv: filterValue.kv,
      tagtc: filterValue.tc,
      tagdm: filterValue.dm,
    };
    // if (resultDesc === 0) {
    //   newPost.desc = desc.current.getContent();
    // }else {
    //   alert(resultDesc)
    // }

    if (mutifile) {
      const data = new FormData();
      let fileName = [];
      [...mutifile].map((file) => data.append("images", file));
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
      await axios.post("http://localhost:8800/api/restaurant", {
        name: newPost.title,
        place: newPost.place,
      });
      // window.location.reload();
    } catch (err) {}
  };

  const handleImageUpload = async (imageFile) => {
    console.log(imageFile)
    // const data = new FormData();
    // data.append('image', imageFile[0]);
    // let choseImage = [];
    // const resultUpload = await axios({
    //   method: "post",
    //   url: "https://api.imgur.com/3/image",
    //   headers: {
    //     Authorization: `Client-ID 225600e2fe06d7b`,
    //   },
    //   data: data,
    // });
    // console.log(resultUpload);
    // if (Array.isArray(imageFile)) {
    //   const uploadArray = imageFile.map(async (item) => {
    //     console.log(item);
    //     const resultUpload = await axios({
    //       method: "post",
    //       url: "https://api.imgur.com/3/image",
    //       headers: {
    //         Authorization: `Client-ID 225600e2fe06d7b`,
    //       },
    //       data: item,
    //     });
    //     console.log(resultUpload); // bỏ hết then đi
    //     if (resultUpload.status === 200) {
    //       return resultUpload.data.data.link;
    //     }
    //   });
    //   choseImage = await Promise.all(uploadArray);
    // }

    const apiUrl = 'https://api.sightengine.com/1.0/check-workflow.json';
    const apiKey = 'HFVyXMsK2mo3DqavoGECiGhNbq'; 
    const apiUser = '1777157158'; 
    const workflowId = 'wfl_fcYaLLijOa94P50zolWlw';

    try {
      const response = await axios.get(apiUrl, {
        params: {
          url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/5/26/913299/Ngan-Ha25.jpg',
          workflow: workflowId,
          api_user: apiUser,
          api_secret: apiKey,
        },
      });

      // Xử lý kết quả từ Sightengine
      console.log(response.data.summary);
      alert(response.data.summary.action === 'accept' ? "hình ảnh hợp lệ" : "Hình ảnh vi phạm tiêu chuẩn cộng đồng");
    } catch (error) {
      // Xử lý lỗi
      if (error.response) console.log(error.response.data);
      else console.log(error.message);
    }
  };


  const MutipleFileChange = (files) => {
    const listImg = Object.values(files);
    const listUrl = listImg.map((img) => URL.createObjectURL(img));
    console.log(listUrl);
    // handleImageUpload(listImg)
    setFiles(files);
    setMutifile(listImg);
    setMutiupload(listUrl);
  };

  function checkCommunityStandards(post) {
    // Kiểm tra mức độ từ khóa lạm dụng trong nội dung bài viết
    function checkKeywordLevel(content, keywords) {
      return keywords.some(keyword => content.includes(keyword));
    }

    // Kiểm tra từ khóa lạm dụng
    if (checkKeywordLevel(post.content, severeKeywords)) {
      return "Bài viết chứa từ khóa lạm dụng nghiêm trọng.";
    } else if (checkKeywordLevel(post.content, moderateKeywords)) {
      return "Bài viết chứa từ khóa lạm dụng mức độ vừa.";
    } else if (checkKeywordLevel(post.content, mildKeywords)) {
      return "Bài viết chứa từ khóa lạm dụng nhẹ.";
    }

    return 0;
  }






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
              <div style={{width: '420px'}}>
                <ItemVote>
                  <TextItemVote style={{fontSize: '20px'}}>Vị trí</TextItemVote>
                  <BasicRating ref={rating.current} type={'place'}/>
                </ItemVote>
                <ItemVote>
                  <TextItemVote style={{fontSize: '20px'}}>Không gian</TextItemVote>
                  <BasicRating ref={rating.current} type={'space'}/>
                </ItemVote>
                <ItemVote>
                  <TextItemVote style={{fontSize: '20px'}}>Đồ ăn</TextItemVote>
                  <BasicRating ref={rating.current} type={'food'}/>
                </ItemVote>
                <ItemVote>
                  <TextItemVote style={{fontSize: '20px'}}>Phục vụ</TextItemVote>
                  <BasicRating ref={rating.current} type={'serve'} />
                </ItemVote>
                <ItemVote>
                  <TextItemVote style={{fontSize: '20px'}}>Giá cả</TextItemVote>
                  <BasicRating ref={rating.current} type={'price'}/>
                </ItemVote>
              </div>
            </div>

            <div className="reviewTop">
              <h2>Đánh Giá của bạn :</h2>
              <div className="reviewcomment">
                <Editor
                    apiKey='2annu51m1l3p8h815234aps59gbyfkt1nzuckp6rrotynkpu'
                  onInit={(evt, editor) => (desc.current = editor)}
                  initialValue={"What's in your mind " + user.username + "?"}
                  init={{
                    height: 400,
                    width: "100%",
                    menubar: false,
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>
            </div>
            <hr className="reviewHr" />
            {mutiupload && (
              <div className="reviewImgContainer">
                {<ReactImageGrid images={mutiupload} countFrom={5} />}
                <CancelIcon
                  className="reviewCancelImg"
                  onClick={() => setMutiupload(null)}
                />
              </div>
            )}
            <form className="reviewBottom">
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
                onClick={() => submitHandler()}
                className="reviewButton"
                type="submit"
                style={{ width: "150px" }}
              >
                Share
              </button>
            </form>
          </div>
          <div className="reviewRight">
            <FormCustom form={form} validateTrigger={["onBlur", "onChange"]}>
              <h2 style={{ width: "80%", paddingBottom: "24px", margin: 'auto' }}>
                Thông tin địa điểm :
              </h2>

              <Form.Item
                style={{
                  width: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Xin vui lòng nhập tên quán ăn.",
                  },
                ]}
              >
                <Floating label={"Tên"} isRequired />
              </Form.Item>

              <Form.Item
                style={{
                  width: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                name={"place"}
                rules={[
                  {
                    required: true,
                    message: "Xin vui lòng nhập địa điểm.",
                  },
                ]}
              >
                <Floating label={"Địa điểm"} isRequired />
              </Form.Item>
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
            </FormCustom>
          </div>
        </div>
      </div>
    </div>
  );
}
