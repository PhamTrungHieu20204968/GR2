import {
  Button,
  Col,
  Image,
  Popconfirm,
  Result,
  Row,
  Space,
  Spin,
  Table,
  message,
} from "antd";
import React, { useState } from "react";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "app/api/productService";

function ListProducts() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [deleteProduct] = useDeleteProductMutation();
  const { data, isError, isLoading } = useGetAllProductsQuery({
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
    })
      .then((res) => {
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
        <Image
          width={64}
          className='object-center'
          src={record.images[0].url}
          fallback='data:image/png;base64,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'
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
      render: (_, record) =>
        parseInt(record?.price).toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        }),
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
          <Button
            type='primary'
            onClick={() => navigate(`/admin/update-product/${record.id}`)}
          >
            Sửa
          </Button>
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
