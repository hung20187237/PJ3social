import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import "./SearchPage.css"
import Feed from "../../components/feed/Feed";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SliderData } from '../../components/slider1/SliderData';
import { SliderSlickData } from '../../components/slider2/SliderSlickData';
import { CatologyData } from '../../components/catology/CatologyData';
import { useContext, useEffect, useState } from "react";
import Post from "../../components/post/Post";
import { Context } from "../../context/Context";
import axios from "axios";



export default function SearchPage() {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(Context);

    useEffect(() => {
        const fetchPosts = async () => {
         
          const res = await axios.get("http://localhost:8800/api/post/timeline/" + user._id);
          setPosts(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        };
        fetchPosts();
      }, [ user._id]);
    const SearchSidebar = () => {
        return (
            <div className="searchsidebar">
                <div className="searchsidebarWrapper">
                    <div className="searchsideText">
                        <span>Lọc kết quả</span>
                    </div>
                    <hr className="searchsidebarHr" />
                    <div className='searchsidebar-top'>
                        <div className='search-top'>
                            <span>Khu vực</span>
                            <ArrowDropDownIcon sx={{ fontSize: 40 }} />
                        </div>
                        <div className='searchbody-top'>
                            {SliderSlickData.map((slides, idx) => (
                                <div className='searchbody-item'>
                                    <span><input type="checkbox"/></span>
                                    <span>Quận{slides.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='searchsidebar-between'>
                        <div className='search-between'>
                            <span>Tiêu Chí</span>
                            <ArrowDropDownIcon sx={{ fontSize: 40 }} />
                        </div>
                        <div className='searchbody-between'>
                            {SliderData.map((slide) => {
                                return(
                                    <div className='searchbody-item'>
                                        <span><input type="checkbox"/></span>
                                        <span>{slide.title}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='searchsidebar-bottom'>
                        <div className='search-bottom'>
                            <span>Tiêu Chí</span>
                            <ArrowDropDownIcon sx={{ fontSize: 40 }} />
                        </div>
                        <div className='searchbody-bottom'>
                            {CatologyData.map((list) => {
                                return(
                                    <div className='searchbody-item'>
                                        <span><input type="checkbox"/></span>
                                        <span>{list.title}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const SearchFeed = () => {
        return(
            <div className="bodysearchFeed">
                {posts.map((p) => {
                    return (
                    <Post key={p._id} post={p}  />
                    )
                })}
            </div>
        );
        
    };
  return (
    <>
        <Topbar/>
        <div className='searchContainer'>
            <SearchSidebar/>
            <SearchFeed/>
        </div>
    </>
  )
}
