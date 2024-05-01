import { Button, Input, Space, Spin, Table } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import { useGetUserOrdersQuery } from "app/api/orderService";
function ListOrder() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { accessToken } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetUserOrdersQuery({
    accessToken,
  });
  if (isLoading) {
    return <Spin />;
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Địa chỉ",
      width: 200,
      key: "address",
      render: (_, record) => `${record?.address} - ${record?.city}`,
    },
    {
      title: "Giá",
      key: "totalMoney",
      render: (_, record) =>
        parseInt(record?.totalMoney).toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        }),
      sorter: (a, b) => a.totalMoney - b.totalMoney,
      width: 150,
    },
    {
      title: "Ghi chú",
      key: "note",
      render: (_, record) => record?.note || "Không có",
      width: 200,
    },
    {
      title: "Loại",
      key: "type",
      render: (_, record) =>
        (record.type === 1 && "Thanh toán toàn bộ đơn hàng") ||
        (record.type === 2 && "Thanh toán 50% đơn hàng") ||
        (record.type === 3 && "Thanh toán khi nhận hàng"),
      width: 120,
    },
    {
      title: "Trạng thái",
      key: "status",
      fixed: "right",
      width: 120,
      render: (_, record) => {
        if (record?.status < 2) {
          return "Đang xử lý";
        } else if (record?.status < 3) {
          return "Đang giao hàng";
        } else return "Đã hoàn thành";
      },
    },
  ];
  const expandedRowRender = (row) => {
    const columns = [
      {
        title: "Tên sản phẩm",
        key: "name",
        width: "50%",
        render: (_, record) => record.product.name,
      },
      {
        title: "Giá",
        key: "price",
        render: (_, record) =>
          parseInt(record.product.price).toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          }),
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={row.orderItems.map((item) => ({ ...item, key: item.id }))}
        pagination={false}
        size='small'
      />
    );
  };

  return (
    <div className=''>
      <div className='text-2xl font-bold mb-4'>Danh sách đơn hàng</div>

      <Table
        columns={columns}
        dataSource={data?.map((item) => ({ ...item, key: item.id }))}
        scroll={{
          x: 1000,
        }}
        expandable={{
          expandedRowRender,
        }}
      />
    </div>
  );
}

export default ListOrder;
