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
    const [filterValue, setFilterValue] = useState({ kv: [], tc: [], dm: [] });
    const [posts, setPosts] = useState([]);
    const [showPosts, setShowPosts] = useState([]);
    const { user } = useContext(Context);
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:8800/api/post/timeline/" + user._id);
            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
            setShowPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        fetchPosts();
    }, [user._id]);
    const filterResult = (catitem) => {
        if (!filterValue.kv.includes(catitem)) {
            setFilterValue({ ...filterValue, kv: [ ...filterValue.kv, catitem] });
        } else {
            const kvItem = (filterValue.kv.filter(kv => kv !== catitem))
            setFilterValue({ ...filterValue, kv: kvItem });
        }
    }
    const filterResult1 = (catitem) => {
        if (!filterValue.tc.includes(catitem)) {
            setFilterValue({ ...filterValue, tc: [ ...filterValue.tc, catitem] });
        } else {
            const tcItem = (filterValue.tc.filter(tc => tc !== catitem))
            setFilterValue({ ...filterValue, tc: tcItem });
        }
    }
    const filterResult2 = (catitem) => {
        if (!filterValue.dm.includes(catitem)) {
            setFilterValue({ ...filterValue, dm: [ ...filterValue.dm, catitem] });
        } else {
            const dmItem = (filterValue.dm.filter(dm => dm !== catitem))
            setFilterValue({ ...filterValue, dm: dmItem });
        }
    }
    useEffect(() => {
        let result = posts;
        
        if (filterValue.kv.length !== 0) {
            result = result.filter(p => filterValue.kv.includes(p.tagkv));
        }
        console.log(result)
        if (filterValue.tc.length !== 0) {
            result = result.filter(p => filterValue.tc.includes(p.tagtc));
        }
        console.log(result)
        if (filterValue.dm.length !== 0) {
            result = result.filter(p => filterValue.dm.includes(p.tagdm));
        }
        console.log(result)
        console.log(filterValue)
        setShowPosts(result);
    }, [filterValue])
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
                            <ArrowDropDownIcon sx={{ fontSize: 40 }} onClick={() => setShow1(!show1)} />
                        </div>
                        {show1 && <div className='searchbody-top'>
                            {SliderSlickData.map((slides, idx) => (
                                <div className='searchbody-item' key={idx}>
                                    <span><input type="checkbox" onClick={() => filterResult(slides.title)} /></span>
                                    <span>{slides.title}</span>
                                </div>
                            ))}
                        </div>}
                    </div>
                    <div className='searchsidebar-between'>
                        <div className='search-between'>
                            <span>Tiêu Chí</span>
                            <ArrowDropDownIcon sx={{ fontSize: 40 }} onClick={() => setShow(!show)} />
                        </div>
                        {show && <div className='searchbody-between'>
                            {SliderData.map((slide) => {
                                return (
                                    <div className='searchbody-item' >
                                        <span href="#"><input type="checkbox" onClick={() => filterResult1(slide.title)} /></span>
                                        <span>{slide.title}</span>
                                    </div>
                                );
                            })}
                        </div>}
                    </div>
                    <div className='searchsidebar-bottom'>
                        <div className='search-bottom'>
                            <span>Danh mục</span>
                            <ArrowDropDownIcon sx={{ fontSize: 40 }} onClick={() => setShow2(!show2)} />
                        </div>
                        {show2 && <div className='searchbody-bottom'>
                            {CatologyData.map((list) => {
                                return (
                                    <div className='searchbody-item'>
                                        <span><input type="checkbox" onClick={() => filterResult2(list.title)} /></span>
                                        <span>{list.title}</span>
                                    </div>
                                );
                            })}
                        </div>}
                    </div>
                </div>
            </div>
        );
    };
    const SearchFeed = () => {
        return (
            <div className="bodysearchFeed">
                {showPosts.map((p, index) => {
                    return (
                        <Post key={index} post={p} />
                    )
                })}
            </div>
        );

    };
    return (
        <>
            <Topbar />
            <div className='searchContainer'>
                <SearchSidebar />
                <SearchFeed />
            </div>
        </>
    )
}
