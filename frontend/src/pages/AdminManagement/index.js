import React, {useContext, useEffect, useState} from 'react';
import {Layout, Menu, Space, Table, Tag, theme} from 'antd';
import searchIcon from "../../images/icon/adminManagement/search.svg";
import filterIcon from "../../images/icon/adminManagement/Filter.svg";
import {BoxFilter, BoxIcon, BoxSearch, ContainerHeader, InputCustom, SearchBar, SearchContainer} from "./styles";
import {Link} from "react-router-dom";
import {Context} from "../../context/Context";
import axios from "axios";
import {columns, columnsComment, columnsPost} from "./contants";
const { Header, Content, Footer, Sider } = Layout;

export default function AdminManagement () {
    const { user, dispatch } = useContext(Context);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [listUsers, setListUsers] = useState([]);
    const [listPosts, setListPosts] = useState([]);
    const [selectMenu, setSelectMenu] = useState('1');



    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get("http://localhost:8800/api/user/all/all/all/");
            setListUsers( res.data);
        };
        fetchUsers();
    },[]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:8800/api/post/allPosts/" + user._id);
            setListPosts( res.data);
        };
        fetchPosts();
    },[]);

    console.log(listPosts)



    return (
        <Layout hasSider>
            <Sider
                style={{
                    background: '#050F33',
                    overflow: 'auto',
                    padding: '24px',
                }}
                width={256}
            >
                <div
                    style={{
                        width: 130,
                        height: 130,
                        margin: 'auto',
                        marginBottom: 32
                    }}
                >
                    <img
                        src={user.avatar ? PF + user.avatar : PF + "person/noAvatar.png"}
                        alt=""
                        style={{
                            width: 130,
                            height: 130,
                        }}
                    />
                </div>
                <Menu
                    theme="dark"
                    selectedKeys={selectMenu}
                    onSelect={(e) => setSelectMenu(e.key)}
                    style={{
                        background: '#050F33',
                        color: 'white',
                        height: 'calc(100vh - (55px + 130px + 16px + 32px)'
                    }}
                >
                    <Menu.Item key="1">Quản lý User</Menu.Item>
                    <Menu.Item key="2">Quản lý Posts</Menu.Item>
                    <Menu.Item key="3">Quản lý Comment</Menu.Item>
                    <Menu.Item key="4">Quản lý Report</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <ContainerHeader>
                        <SearchBar>
                            <SearchContainer>
                                <BoxSearch>
                                    <InputCustom
                                        placeholder="Nhập từ khóa"
                                        allowClear
                                        bordered={false}
                                    />
                                    <BoxIcon src={searchIcon}/>
                                </BoxSearch>
                            </SearchContainer>
                            <BoxFilter>
                                <BoxIcon src={filterIcon}/>
                            </BoxFilter>
                        </SearchBar>
                        <Link to={"/profile/" + user.username}>
                            <img
                                src={user.avatar ? PF + user.avatar : PF + "person/noAvatar.png"}
                                alt=""
                                className="topbarImg"
                            />
                        </Link>
                    </ContainerHeader>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px 0',
                        overflow: 'initial',
                        marginLeft: 50,
                        marginRight: 50,
                    }}
                >
                    <div>
                        {selectMenu === '1' && <Table columns={columns} dataSource={listUsers} />}
                        {selectMenu === '2' && <Table columns={columnsPost} dataSource={listPosts} />}
                        {selectMenu === '3' && <Table columns={columnsComment} dataSource={[]} />}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};