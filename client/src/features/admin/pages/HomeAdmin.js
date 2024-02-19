import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import { useSelector } from "react-redux";

import Sidebar from "../components/Sidebar";
import { Space, Table, Tag, Input, Result, Spin } from "antd";
import { useGetAllUserQuery } from "app/api/userService";

const { Search } = Input;
const columns = [
  {
    title: "Tên người dùng",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => (
      <Tag color={status === 1 ? "green" : "default"}>
        {status === 1 ? "Hoạt động" : "Ngoại tuyến"}
      </Tag>
    ),
    filters: [
      {
        text: "Hoạt động",
        value: 1,
      },
      {
        text: "Ngoại tuyến",
        value: 0,
      },
    ],
    onFilter: (value, record) => record.status === value,
  },
  {
    title: "Số đơn hàng",
    key: "orders",
    render: (_, record) => record.orders || 0,
    sorter: (a, b) => a.orders - b.orders,
  },
  {
    title: "Số bài viết",
    key: "blogs",
    render: (_, record) => record.blogs || 0,
    sorter: (a, b) => a.blogs - b.blogs,
  },
  {
    title: "Số Bình luận",
    key: "comments",
    render: (_, record) => record.comments || 0,
    sorter: (a, b) => a.comments - b.comments,
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size='middle'>
        <Button>Xem chi Tiết</Button>
        <Button type='primary' danger>
          Xóa
        </Button>
      </Space>
    ),
  },
];
const HomeAdmin = () => {
  const [searchValue, setSearchValue] = useState("");
  const { accessToken } = useSelector((state) => state.auth);
  const { data, isError, isLoading } = useGetAllUserQuery({
    accessToken,
  }); 

  if (isLoading) {
    <Spin />;
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className='w-full h-screen overflow-hidden'>
      <Row gutter={16} className='pr-4'>
        <Col span={6}>
          <Sidebar></Sidebar>
        </Col>
        <Col span={18}>
          {isError || data?.error ? (
            <Result
              status='500'
              title='500'
              subTitle='Không thể kết nối đến Server.'
            />
          ) : (
            <div>
              <Row className='my-8' justify={"space-between"}>
                <Col>
                  <h1 className='text-3xl font-bold'>Danh sách người dùng</h1>
                </Col>
                <Col>
                  <Search
                    placeholder='Tìm kiếm'
                    allowClear
                    value={searchValue}
                    onChange={handleSearch}
                  />
                </Col>
              </Row>
              <Table
                columns={columns}
                dataSource={data
                  ?.map((item) => ({ ...item, key: item.id }))
                  .filter((item) =>
                    item.name.toUpperCase().includes(searchValue.toUpperCase())
                  )}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default HomeAdmin;
