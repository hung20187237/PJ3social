import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import React, {useEffect, useState} from "react";
import Rightbar from "../../components/rightbar/Rightbar";
import RoomIcon from "@mui/icons-material/Room";
import SaveIcon from "../../images/icon/restaurent/save.svg";
import RightIcon from "../../images/icon/restaurent/forward_next_right.svg";
import "./SearchRes.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import axios from "axios";
import {useParams} from "react-router";
import {
    BoxContainer,
    BoxIcon, BoxImage, BoxImageContent, BoxPlace,
    BoxScore, BoxSwiper, BoxTextPlace, ButtonReview, ContentPostContainer,
    Flex,
    FlexColum,
    ItemInteger, ItemSwiper, LabelInteger, ListPostContainer, PostContainer, PostItem,
    ReactImageGridCustom,
    ReviewContainer, TextPostContainer, TitlePostContainer
} from "./styles";
import {Button, Col, InputNumber, Modal, Row, Slider} from "antd";
import {FaCar, FaChild, FaCloudSun, FaHeart, FaMotorcycle, FaRegCreditCard, FaWifi} from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { GiCakeSlice } from "react-icons/gi";
import PostRes from "./Component/Post";
import ModalReview from "./Component/ModalReview";

export default function SearchPost(username) {
  const [restaurant, setRestaurant] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [post, setPost] = useState([]);
  const { resId } = useParams();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/restaurant/" + resId
      );
      setRestaurant(res.data);
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const postRes = await axios.get(
        "http://localhost:8800/api/restaurant/reviewposts/" + resId
      );
      setPost(postRes.data);
    };
    fetchPosts();
  }, []);


  console.log(restaurant);
  console.log(post);

  function getAllImages(objectsArray) {
    return objectsArray.flatMap(obj => obj.img);
  }

  const listImage = getAllImages(post);
  const listUrl =listImage.map((img) => PF + img);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    console.log('post', post)

    const IntegerStep = () => {
        const [inputValue, setInputValue] = useState(4);
        const onChange = (newValue) => {
            setInputValue(newValue);
        };
        return (
            <Row style={{flex: 1}}>
                <Col span={18}>
                    <Slider
                        min={1.0}
                        max={5.0}
                        onChange={onChange}
                        value={typeof inputValue === 'number' ? inputValue : 0}
                    />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={1}
                        max={5}
                        style={{
                            margin: '0 16px',
                        }}
                        bordered={false}
                        value={inputValue}
                        onChange={onChange}
                    />
                </Col>
            </Row>
        );
    };

  return (
    <>
      <Topbar />
      <div className="newfeedContainer">
        <Sidebar />
        <div className="bodyNewFeed">
            <div className="Place_resTop__1xCCM">
            <Flex>
              <h1>{restaurant.name}</h1>
              <BoxIcon src={SaveIcon}/>
            </Flex>
            <div class="Place_address__2xVBb" id="galery">
              <p class="Place_intro__2uQsk">
                Góc vườn nhỏ xanh mướt chill chill
              </p>
              <div>
                  <RoomIcon htmlColor="green" className="reviewIcon" />
                  <span>{restaurant.places}</span>
                </div>
            </div>
            <div className="postCenter">
              <div
                  className="postText"
                  dangerouslySetInnerHTML={{ __html: post.desc }}
              />
              <div className="postcenterimg">
                  <ReactImageGridCustom images={listUrl} />
              </div>
            </div>
                <ReviewContainer>
                    <BoxContainer>
                        <h2>Đánh giá</h2>
                        <BoxScore>
                            <p>5.0</p>
                            <div>
                                <h2>Tuyệt vời</h2>
                                <span>/5 (1 đánh giá)</span>
                            </div>
                        </BoxScore>
                        <FlexColum>
                            <ItemInteger>
                                <LabelInteger>Vị trí</LabelInteger>
                                <IntegerStep/>
                            </ItemInteger>
                            <ItemInteger>
                                <LabelInteger>Không gian</LabelInteger>
                                <IntegerStep/>
                            </ItemInteger>
                            <ItemInteger>
                                <LabelInteger>Đồ ăn</LabelInteger>
                                <IntegerStep/>
                            </ItemInteger>
                            <ItemInteger>
                                <LabelInteger>Phục vụ</LabelInteger>
                                <IntegerStep/>
                            </ItemInteger>
                            <ItemInteger>
                                <LabelInteger>Giá cả</LabelInteger>
                                <IntegerStep/>
                            </ItemInteger>
                        </FlexColum>
                    </BoxContainer>
                    <BoxContainer>
                        <h2>Địa điểm cụ thể</h2>
                        <BoxPlace>
                            <BoxImage>
                                <img src={'https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/pin-m-cafe+EE0033(105.8352668,21.078522)/105.8352668,21.078522,13,0/400x210?access_token=pk.eyJ1IjoiaG9haXBoYW4iLCJhIjoiY2s4NjRuNm40MGUweDNwcGZ4azZhMTA1MCJ9.rExJxHGtG7JXWJwEjJTTCg'}/>
                            </BoxImage>
                        </BoxPlace>
                        <BoxTextPlace>
                            <img src={RightIcon}/>
                            <a href="https://www.google.com/maps/dir/?api=1&amp;destination=21.078522,105.8352668" target="_blank">{restaurant.name} – {restaurant.places}</a>
                        </BoxTextPlace>
                    </BoxContainer>
                </ReviewContainer>
                <BoxSwiper>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={5}
                        onSwiper={(swiper) => console.log(swiper)}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        loop={true}
                    >
                        <SwiperSlide>
                            <ItemSwiper>
                                <FaCloudSun />
                                <span>Bàn ngoài trời</span>
                            </ItemSwiper>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ItemSwiper>
                                <FaWifi />
                                <span>Wifi miễn phí</span>
                            </ItemSwiper>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ItemSwiper>
                                <FaCar />
                                <span>Chỗ đậu ô tô</span>
                            </ItemSwiper>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ItemSwiper>
                                <GiCakeSlice />
                                <span>Bánh ngọt</span>
                            </ItemSwiper>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ItemSwiper>
                                <FaRegCreditCard />
                                <span>Thanh toán bằng thẻ</span>
                            </ItemSwiper>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ItemSwiper>
                                <MdOutlinePets />
                                <span>Mang thú cưng</span>
                            </ItemSwiper>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ItemSwiper>
                                <FaMotorcycle />
                                <span>Giữ xe máy</span>
                            </ItemSwiper>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ItemSwiper>
                                <FaChild />
                                <span>Chỗ chơi trẻ em</span>
                            </ItemSwiper>
                        </SwiperSlide>
                    </Swiper>
                </BoxSwiper>
                <PostContainer>
                    <TitlePostContainer>
                        <h2>
                            Đánh giá từ cộng đồng
                            <span>({post.length})</span>
                        </h2>
                        <ButtonReview onClick={showModal}>Viết đánh giá</ButtonReview>
                        <ModalReview visible={isModalOpen} onSubmit={handleOk} onCancel={handleCancel}/>
                    </TitlePostContainer>
                    <ContentPostContainer>
                        <BoxImageContent>
                            <img src={'https://ik.imagekit.io/reviewcafe/Online_Review-cuate_wG_WzURJF.svg'}/>
                        </BoxImageContent>
                        <TextPostContainer>
                            <h2>Bạn đã từng đến đây</h2>
                            <span>
                                Chia sẻ trải nghiệm và cảm nhận của bản thân cho mọi người cùng biết
                                <FaHeart />
                                <span>Những review chất lượng sẽ được xuất hiện ở bảng tin đấy!</span>
                            </span>
                        </TextPostContainer>
                    </ContentPostContainer>
                    <ListPostContainer>
                        {post.map((item) => {
                            return (
                                <PostRes post={item}/>
                            )
                        })}
                    </ListPostContainer>
                </PostContainer>
          </div>
        </div>
        <Rightbar />
      </div>
    </>
  );
}
