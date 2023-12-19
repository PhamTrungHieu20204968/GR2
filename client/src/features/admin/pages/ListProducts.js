import { Button, Col, Popconfirm, Result, Row, Space, Spin, Table, message } from "antd";
import React, { useState } from "react";
import Search from "antd/es/input/Search";

import Sidebar from "../components/Sidebar";
import {
  useGetAllProductsAdminQuery,
  useDeleteProductMutation,
} from "app/api/productService";

function ListProducts() {
  const [searchValue, setSearchValue] = useState("");

  const [deleteProduct] = useDeleteProductMutation();
  const { data, isError, isLoading } = useGetAllProductsAdminQuery({
    accessToken: JSON.parse(localStorage.getItem("token")),
  });

  if (isLoading) {
    <Spin />;
  }

  const handleDeleteProduct = (id) => {
    deleteProduct({
      id,
      headers: {
        accessToken: JSON.parse(localStorage.getItem("token")),
      },
    }).then((res) => {
        if (res.data.error) {
          message.error(res.data.error);
        } else {
          message.success("Xóa thành công!");
        }
      })
      .catch((err) => {
        message.error("Xóa thất bại!");
        console.log(err);
      });
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      key: "images",
      render: (_, record) => (
        <img
          className='w-16 h-16 object-center'
          src={record.images[0].url}
          alt={record.name}
        />
      ),
    },
    {
      title: "Loại sản phẩm",
      key: "category",
      render: (_, record) => record.category.name,
      filters: [
        {
          text: "CHÓ CẢNH",
          value: "CHÓ CẢNH",
        },
        {
          text: "MÈO CẢNH",
          value: "MÈO CẢNH",
        },
        {
          text: "PHỤ KIỆN",
          value: "PHỤ KIỆN",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.category.name === value,
    },
    {
      title: "Giá",
      key: "price",
      render: (_, record) => record.price + "đ",
      sorter: (a, b) => parseInt(a.price) - parseInt(b.price),
    },
    {
      title: "Số lượng",
      key: "quantity",
      dataIndex: "quantity",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Số lượng đã bán",
      key: "sold",
      render: (_, record) => record.category.sold || 0,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size='middle'>
          <Button type='primary'>Sửa</Button>
          <Popconfirm
            title='Xóa sản phẩm này?'
            description='Bạn có chắc chắn xóa?'
            okText='Có'
            cancelText='Không'
            onConfirm={() => handleDeleteProduct(record.id)}
          >
            <Button type='primary' danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  console.log(data);
  return (
    <div className='w-full h-screen overflow-y-auto overflow-x-hidden'>
      <Row gutter={16} className='pr-4'>
        <Col span={6}>
          <Sidebar SelectedKey='2' OpenKeys={["sub2"]}></Sidebar>
        </Col>
        <Col span={18}>
          {isError ? (
            <Result
              status='500'
              title='500'
              subTitle='Không thể kết nối đến Server.'
            />
          ) : (
            <div>
              <Row className='my-8' justify={"space-between"}>
                <Col>
                  <h1 className='text-3xl font-bold'>Danh sách sản phẩm</h1>
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
}

export default ListProducts;
