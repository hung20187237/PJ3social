import React, {useContext} from 'react';
import {
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Space, Table, Tag, theme} from 'antd';
import searchIcon from "../../images/icon/adminManagement/search.svg";
import filterIcon from "../../images/icon/adminManagement/Filter.svg";
import {BoxFilter, BoxIcon, BoxSearch, ContainerHeader, InputCustom, SearchBar, SearchContainer} from "./styles";
import {Link} from "react-router-dom";
import {Context} from "../../context/Context";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Quản lý User', '1', <UserOutlined />),
    getItem('Quản lý Report', '2', <TeamOutlined />),
];
export default function AdminManagement () {
    const { user, dispatch } = useContext(Context);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];


    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout
                style={{
                    marginLeft: 200,
                }}
            >
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
                    }}
                >
                    <div>
                        <Table columns={columns} dataSource={data} />
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