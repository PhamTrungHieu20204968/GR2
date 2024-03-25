import {
  Button,
  Col,
  Input,
  Result,
  Row,
  Segmented,
  Select,
  Space,
  Spin,
  Table,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Highlighter from "react-highlight-words";

import Sidebar from "../components/Sidebar";
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "app/api/orderService";

function ListOrders() {
  const [update] = useUpdateOrderMutation();
  const [tab, setTab] = useState(2);
  const { accessToken } = useSelector((state) => state.auth);
  const { data, isError, isLoading } = useGetAllOrdersQuery({
    accessToken,
  });

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  console.log(data);
  if (isLoading) {
    <Spin />;
  }

  const onChangeTab = (value) => {
    switch (value) {
      case "Đang giao hàng":
        setTab(3);
        break;
      case "Đã hoàn thành":
        setTab(4);
        break;
      default:
        setTab(2);
        break;
    }
  };

  const handleUpdateOrderStatus = (value, record) => {
    update({
      id: record.id,
      headers: {
        accessToken,
      },
      data: {
        address: record.address,
        fullName: record.fullName,
        city: record.city,
        telephone: record.telephone,
        email: record.email,
        totalMoney: record.totalMoney,
        type: record.type,
        status: value,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          message.error(res.data?.error);
        } else {
          message.success("Sửa thành công!");
        }
      })
      .catch((err) => {
        message.error("Sửa thất bại!");
        console.log(err);
      });
  };

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
      title: "Người đặt",
      dataIndex: "fullName",
      key: "fullName",
      width: 140,
      fixed: "left",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Địa chỉ",
      width: 200,
      key: "address",
      render: (_, record) => `${record?.address} - ${record?.city}`,
    },
    {
      title: "Số điện thoại",
      dataIndex: "telephone",
      key: "telephone",
      width: 120,
      ...getColumnSearchProps("telephone"),
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
      title: "Email",
      dataIndex: "email",
      width: 300,
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Trạng thái",
      key: "status",
      fixed: "right",
      width: 180,
      render: (_, record) => (
        <Select
          defaultValue={record?.status}
          style={{
            width: 160,
          }}
          onChange={(value) => handleUpdateOrderStatus(value, record)}
          options={[
            {
              value: 0,
              label: "Chưa thanh toán",
            },
            {
              value: 1,
              label: "Đã thanh toán",
            },
            {
              value: 2,
              label: "Đang giao hàng",
            },
            {
              value: 3,
              label: "Đã hoàn thành",
            },
          ]}
        />
      ),
    },
  ];
  console.log(data);
  return (
    <div className='w-full h-screen overflow-y-auto overflow-x-hidden'>
      <Row gutter={16} className='pr-4'>
        <Col span={6}>
          <Sidebar SelectedKey='5' OpenKeys={["sub4"]}></Sidebar>
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
                <Col span={24}>
                  <h1 className='text-3xl font-bold'>Danh sách đơn hàng</h1>
                </Col>
                <Col span={24}>
                  <Segmented
                    options={["Chưa xử lý", "Đang giao hàng", "Đã hoàn thành"]}
                    onChange={onChangeTab}
                    className='mt-6'
                  />
                </Col>
              </Row>
              <Table
                columns={columns}
                dataSource={data?.filter(
                  (item) =>
                    (tab === 2 && item.status <= 2) ||
                    (tab === 3 && item.status === 3) ||
                    (tab === 4 && item.status === 4)
                )}
                scroll={{
                  x: 1000,
                }}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ListOrders;
