import moment from "moment/moment";
import {Space, Tag} from "antd";
import React from "react";

export const LIST_STATUS_TYPE = [
  {
    value: '-1',
    label: 'Tất cả',
  },
  {
    value: '1',
    label: 'Đang hoạt động',
  },
  {
    value: '0',
    label: 'Không hoạt động',
  },
];

export const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
    width: '4%',
    render: (text, record, index) => <div>{index + 1}</div>
  },
  {
    title: 'Name',
    dataIndex: 'username',
    key: 'username',
    render: (text) => <div>{text}</div>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => <div>{moment(text).format('MMMM Do YYYY, h:mm:ss a')}</div>,
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    render: (text) => <div>{text ? 'Kích hoạt' : 'Vô hiệu hóa'}</div>,
  },
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'role',
    render: (text) =>
        <Tag color="#108ee9" key={text}>
          {text}
        </Tag>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
    ),
  },
];





