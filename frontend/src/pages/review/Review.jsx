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
    const [files, setFiles] = useState();


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
            let fileName = [];
            [...mutifile].map(file =>
                data.append('images', file)
            )

            console.log(newPost);
            try {
                await axios.post("http://localhost:8800/api/mutiupload", data)
                    .then(res =>
                        res.data
                    ).then(data =>
                        data.file.map(file =>
                            fileName.push(file.filename)
                        )
                    )
                newPost.img = Object.values(fileName);
            }
            catch (err) { }
        }
        try {
            await axios.post("http://localhost:8800/api/post", newPost);
            window.location.reload();
        } catch (err) { }

    };

    const log = (e) => {
        e.preventDefault();
        if (desc.current) {
            console.log(desc.current.getContent());
        }
    };

    const MutipleFileChange = (files) => {
        const listImg = Object.values(files);
        console.log(listImg);
        setFiles(files);
        setMutifile(listImg);
    }


    return (
        <div className="review">
            <Topbar />
            <div className="reviewWrapper">
                <div className="headerReview">
                    <span className="textContent">Vi???t Review</span>
                    <hr className="reviewHr" />
                </div>
                <div className="bodyReview">
                    <div className="reviewLeft">
                        <div className="starRating">
                            <h2>X???p h???ng c???a b???n :</h2>
                            <BasicRating ref={rating} />

                        </div>

                        <div className="reviewTop">
                            <h2>????nh Gi?? c???a b???n :</h2>
                            <div className="reviewcomment">
                                <Editor
                                    onInit={(evt, editor) => desc.current = editor}
                                    initialValue={"What's in your mind " + user.username + "?"}
                                    init={{
                                        height: 400,
                                        width: "100%",
                                        menubar: false,
                                        plugins: [
                                            'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                                            'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                            'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
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
                                    ) : null
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
                            <button
                                // onClick={log}
                                className="reviewButton" type="submit" style={{width:'150px'}}>
                                Share
                            </button>
                        </form>
                    </div>
                    <div className="reviewRight">
                        <form className="reviewBox">
                            <h2>Th??ng tin ?????a ??i???m :</h2>
                            <input
                                placeholder="T??n"
                                type=""
                                required
                                className="reviewInput"
                                ref={title}
                            />
                            <input
                                placeholder="?????a ??i???m"
                                type="location"
                                required
                                className="reviewInput"
                                ref={place}
                            />
                            <input className="reviewInput" list="Country" placeholder=" Khu V???c" ref={tagkv} />
                            <datalist id="Country">
                                <option value="Qu???n H?? ????ng" />
                                <option value="Qu???n Thanh Xu??n" />
                                <option value="Qu???n Ho??n Ki???m" />
                                <option value="Qu???n Hai B?? Tr??ng" />
                                <option value="Qu???n Ho??ng Mai" />
                                <option value="Qu???n T??y H???" />
                                <option value="Qu???n C???u Gi???y" />
                                <option value="Qu???n Long Bi??n" />
                                <option value="Qu???n ?????ng ??a" />
                                <option value="Qu???n Ba ????nh" />
                            </datalist>
                            <input className="reviewInput" list="Tieuchi" placeholder=" Ti??u Ch??" ref={tagtc} />
                            <datalist id="Tieuchi">
                                <option value="H???n h??" />
                                <option value="S???ng ???o" />
                                <option value="Sang ch???nh" />
                                <option value="???????ng ph??? " />
                                <option value="Ti???c t??ng" />
                                <option value="Ti???t ki???m" />
                            </datalist>
                            <input className="reviewInput" list="Danhmuc" placeholder=" Danh m???c" ref={tagdm} />
                            <datalist id="Danhmuc">
                                <option value="H???i s???n" />
                                <option value="B??n-Ph???" />
                                <option value="C??m sinh vi??n" />
                                <option value="L???u-N?????ng" />
                                <option value="Buffet" />
                                <option value="??n V???t" />
                                <option value="????? Ng???t" />
                                <option value="B??-Tr??u" />
                                <option value="G??-V???t" />
                                <option value="Ngo???i qu???c" />
                                <option value="Nh???u" />
                                <option value="????? ??n nhanh" />
                            </datalist>
                            {/* <button
                                // onClick={log} 
                                className="reviewButton" type="submit">
                                Share
                            </button> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}