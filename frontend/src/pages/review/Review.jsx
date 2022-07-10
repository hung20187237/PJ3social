import "./Review.css";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CancelIcon from '@mui/icons-material/Cancel';
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Topbar from "../../components/topbar/Topbar";
import BasicRating from "../../components/star/star";
import { Editor } from '@tinymce/tinymce-react';




export default function Review() {
  const { user } = useContext(Context);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const title = useRef();
  const rating = useRef(4);
  const place = useRef();
  const tagkv = useRef();
  const tagtc = useRef();
  const tagdm = useRef();
  const [mutifile, setMutifile] = useState('');


  const submitHandler = async (e) => {
    e.preventDefault();
    
    const newPost = {
        userId: user._id,
        desc: desc.current.getContent(),
        title: title.current.value,
        rating: rating.current,
        place: place.current.value,
        tagkv: tagkv.current.value,
        tagtc: tagtc.current.value,
        tagdm: tagdm.current.value,
    };
    if (mutifile) {
        const data = new FormData();
        const fileName = Date.now() + mutifile.name;
        data.append("name", fileName);
        for(var i =0; i < mutifile.length; i++){
            data.append("file", mutifile[i]);
        }
        newPost.img = Object.values(fileName);
        console.log(newPost);
        try {
            await axios.post("http://localhost:8800/api/mutiupload", data);
        } catch (err) {}
    }
    try {
        await axios.post("http://localhost:8800/api/post", newPost);
        window.location.reload();
    } catch (err) {}
    
  };

  const log = () => {
     if (desc.current) {
       console.log(desc.current.getContent());
     }
   };

 const MutipleFileChange = (files) => {
    const listImg = Object.values(files);
    console.log(listImg);
    setMutifile(listImg);
 }

  return (
    <div className="review">
        <Topbar/>
        <div className="reviewWrapper">
            <div className="headerReview">
                <span className="textContent">Viết Review</span>
                <hr className="reviewHr" />
            </div>
            <div className="bodyReview">
                <div className="reviewLeft">
                    <div className="starRating">
                        <h2>Xếp hạng của bạn :</h2>
                        <BasicRating ref={rating}/>

                    </div>

                    <div className="reviewTop">
                        <h2>Đánh Giá của bạn :</h2>
                        <div className="reviewcomment">
                            <Editor
                                onInit={(evt, editor) => desc.current = editor}
                                initialValue={"What's in your mind " + user.username + "?"}
                                init={{
                                height: 400,
                                width: "100%",
                                menubar: false,
                                plugins: [
                                'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
                                'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
                                'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
                                ],
                                toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor | ' +
                                'alignleft aligncenter alignright alignjustify | ' +
                                'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </div>
                    </div>
                    <hr className="reviewHr" />
                    {mutifile && (
                    <div className="reviewImgContainer">

                        {
                            mutifile.length > 1 ? mutifile.map((img) => 
                            <img className="reviewImg" src={URL.createObjectURL(img)} alt="" />
                            ):null
                        }
                        <CancelIcon className="reviewCancelImg" onClick={() => setMutifile(null)} />
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
                                        MutipleFileChange(e.target.files)
                                        
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
                            <EmojiEmotionsIcon htmlColor="goldenrod" className="reviewIcon" />
                            <span className="reviewOptionText">Feelings</span>
                            </div>
                        </div>
                        <button onClick={log} className="reviewButton" type="submit">
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
                        <input   class="reviewInput" list="Country" placeholder=" Khu Vực" ref={tagkv}/>
                            <datalist  id="Country">
                                <option value="Quận Hà Đông"/>
                                <option value="Quận Thanh Xuân"/>
                                <option value="Quận Hoàn Kiếm"/>
                                <option value="Quận Hai Bà Trưng"/>
                                <option value="Quận Hoàng Mai"/>
                                <option value="Quận Tây Hồ"/>
                                <option value="Quận Cầu Giấy"/>
                                <option value="Quận Long Biên"/>
                                <option value="Quận Đống Đa"/>
                                <option value="Quận Ba Đình"/>
                            </datalist>
                        <input   class="reviewInput" list="Tieuchi" placeholder=" Tiêu Chí" ref={tagtc}/>
                            <datalist  id="Tieuchi">
                                <option value="Hẹn hò"/>
                                <option value="Sống ảo"/>
                                <option value="Sang chảnh"/>
                                <option value="Đường phố "/>
                                <option value="Tiệc tùng"/>
                                <option value="Tiết kiệm"/>
                            </datalist>
                        <input   class="reviewInput" list="Danhmuc" placeholder=" Danh mục" ref={tagdm}/>
                            <datalist  id="Danhmuc">
                                <option value="Hải sản"/>
                                <option value="Bún-Phở"/>
                                <option value="Cơm sinh viên"/>
                                <option value="Lẩu-Nướng"/>
                                <option value="Buffet"/>
                                <option value="Ăn Vặt"/>
                                <option value="Đồ Ngọt"/>
                                <option value="Bò-Trâu"/>
                                <option value="Gà-Vịt"/>
                                <option value="Ngoại quốc"/>
                                <option value="Nhậu"/>
                                <option value="Đồ ăn nhanh"/>
                            </datalist>
                        <button onClick={log} className="reviewButton" type="submit">
                            Share
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}