import {
  Button,
  DatePicker,
  InputNumber,
  Modal,
  Segmented,
  Select,
  Spin,
  Table,
  message,
} from "antd";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import {
  useGetUserOrdersQuery,
  useUserCreateOrderMutation,
} from "app/api/orderService";
import { socketContext } from "components/SocketProvider";
function ListOrder() {
  const { accessToken, userId } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetUserOrdersQuery({
    accessToken,
  });
  const socket = useContext(socketContext);
  const [currentCart, setCurrentCart] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCreate] = useUserCreateOrderMutation();
  const [tab, setTab] = useState(1);
  const [sendTime, setSendTime] = useState("");
  if (isLoading) {
    return <Spin />;
  }
  const handleReOrder = (row) => {
    setCurrentCart(
      row?.orderItems.map((item) => ({
        ...item,
        name: item.product.name,
        price: item.product.price,
        orderQuantity: item.quantity,
      }))
    );
    setUserInfo({
      address: row.address,
      fullName: row.fullName,
      city: row.city,
      telephone: row.telephone,
      email: row.email,
      totalMoney: 0,
      type: 0,
      status: 0,
    });
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentCart(null);
    setUserInfo(null);
    setTab(1);
    setSendTime("");
  };
  const handleOk = () => {
    if (!sendTime) {
      message.error("Vui lòng chọn thời gian!");
      return;
    }
    const totalCost = currentCart.reduce((total, item) => {
      return total + parseInt(item.price) * item.orderQuantity;
    }, 0);
    userCreate({
      data: {
        ...userInfo,
        totalMoney: totalCost,
        cart: currentCart.map((item) => ({ ...item, id: item.productId })),
        sendTime,
        point: 0,
      },
      headers: {
        accessToken,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          message.error(res.data.error);
        } else {
          message.success("Tạo thành công!");
          socket?.emit("schedule-notification", {
            receiverId: userId,
            notificationId: res.data.notification.id,
            orderId: res.data.order.id,
            type: 3,
            sendTime,
            repeatTime: sendTime,
          });
          handleCancel();
        }
      })
      .catch((err) => {
        message.error("Tạo thất bại!");
        console.log(err);
      });
  };
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
      title: "Trạng thái",
      key: "status",
      width: 120,
      filters: [
        {
          text: "Đang xử lý",
          value: 1,
        },
        {
          text: "Đang giao hàng",
          value: 2,
        },
        {
          text: "Đã hoàn thành",
          value: 3,
        },
      ],
      onFilter: (value, record) => record?.status === value,
      render: (_, record) => {
        if (record?.status < 2) {
          return "Đang xử lý";
        } else if (record?.status < 3) {
          return "Đang giao hàng";
        } else return "Đã hoàn thành";
      },
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
      title: "Hành động",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_, record) => {
        return (
          <Button type='primary' onClick={() => handleReOrder(record)}>
            Tạo lời nhắc
          </Button>
        );
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

  const cartColumns = [
    {
      title: "SẢN PHẨM",
      dataIndex: "product",
      key: "product",
      width: 400,
      render: (_, record) => (
        <div className='w-full flex items-center gap-2 overflow-hidden'>
          <Link
            to={`/products/${
              record.categoryId === 1
                ? "foods"
                : record.categoryId === 2
                ? "accessories"
                : "pets"
            }/${record.name}`}
            className='hover:text-pink-400 cursor-pointer'
          >
            {record.name}
          </Link>
        </div>
      ),
    },
    {
      title: "GIÁ",
      dataIndex: "price",
      render: (_, record) => (
        <b>
          {parseInt(record.price).toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </b>
      ),
    },
    {
      title: "SỐ LƯỢNG",
      key: "quantity",
      render: (_, record) => (
        <InputNumber
          value={record.orderQuantity}
          className='w-14'
          min={1}
          max={99}
          onChange={(value) =>
            setCurrentCart(
              currentCart.map((item) => {
                if (item.id === record.id)
                  return { ...item, orderQuantity: value };
                else return item;
              })
            )
          }
        ></InputNumber>
      ),
    },
    {
      title: "TỔNG CỘNG",
      dataIndex: "total",
      key: "total",
      render: (_, record) => {
        return (
          <b className=''>
            {(parseInt(record.price) * record.orderQuantity).toLocaleString(
              "vi",
              {
                style: "currency",
                currency: "VND",
              }
            )}
          </b>
        );
      },
    },
  ];
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
      <Modal
        title='Tạo lời nhắc cho đơn hàng'
        open={isModalOpen}
        onOk={handleOk}
        okText='Tạo lời nhắc'
        cancelText='Hủy'
        onCancel={handleCancel}
      >
        <Table
          dataSource={currentCart?.map((item) => ({ ...item, key: item.id }))}
          columns={cartColumns}
          pagination={false}
        />
        <div className='my-4 text-base font-semibold'>Thiết lập thời gian</div>
        <Segmented
          defaultValue='Đặt 1 lần'
          style={{
            marginBottom: 16,
          }}
          onChange={(value) => {
            setTab(value);
            setSendTime("");
          }}
          value={tab}
          options={[
            { label: "Đặt 1 lần", value: 1 },
            { label: "Đặt hàng tuần", value: 2 },
            { label: "Đặt hàng tháng", value: 3 },
          ]}
        />
        {tab === 1 && (
          <div>
            Đặt 1 lần vào:{" "}
            <DatePicker
              onChange={(value) => {
                if (value) {
                  setSendTime(value?.format("YYYY-MM-DD"));
                } else setSendTime("");
              }}
              value={sendTime ? dayjs(sendTime, "YYYY-MM-DD") : null}
              size='small'
              minDate={dayjs(dayjs(Date.now()).add(1, "day"), "YYYY-MM-DD")}
              inputReadOnly
              className='ml-4'
              placeholder='Chọn ngày ...'
            />
          </div>
        )}
        {tab === 2 && (
          <div className='flex items-center'>
            <span>Đặt hàng tuần vào:</span>
            <Select
              placeholder='Chọn ngày ...'
              mode='multiple'
              allowClear
              placement='topRight'
              className='ml-4 flex-1'
              onChange={(value) => {
                if (value) {
                  setSendTime(`0 0 * * ${value.join(",")}`);
                } else setSendTime("");
              }}
              options={[
                {
                  value: 1,
                  label: "Thứ hai",
                },
                {
                  value: 2,
                  label: "Thứ ba",
                },
                {
                  value: 3,
                  label: "Thứ tư",
                },
                {
                  value: 4,
                  label: "Thứ năm",
                },
                {
                  value: 5,
                  label: "Thứ sáu",
                },
                {
                  value: 6,
                  label: "Thứ bảy",
                },
                {
                  value: 0,
                  label: "Chủ nhật",
                },
              ]}
            />
          </div>
        )}
        {tab === 3 && (
          <div className='flex items-center'>
            <span>Đặt hàng tháng vào ngày:</span>
            <Select
              placeholder='Chọn ngày ...'
              mode='multiple'
              allowClear
              className='ml-4 flex-1'
              onChange={(value) => {
                if (value) {
                  setSendTime(`0 0 ${value.join(",")} */ *`);
                } else setSendTime("");
              }}
              options={[
                {
                  value: 1,
                  label: "Ngày 1",
                },
                {
                  value: 2,
                  label: "Ngày 2",
                },
                {
                  value: 3,
                  label: "Ngày 3",
                },
                {
                  value: 4,
                  label: "Ngày 4",
                },
                {
                  value: 5,
                  label: "Ngày 5",
                },
                {
                  value: 6,
                  label: "Ngày 6",
                },
                {
                  value: 7,
                  label: "Ngày 7",
                },
                {
                  value: 8,
                  label: "Ngày 8",
                },
                {
                  value: 9,
                  label: "Ngày 9",
                },
                {
                  value: 10,
                  label: "Ngày 10",
                },
                {
                  value: 11,
                  label: "Ngày 11",
                },
                {
                  value: 12,
                  label: "Ngày 12",
                },
                {
                  value: 13,
                  label: "Ngày 13",
                },
                {
                  value: 14,
                  label: "Ngày 14",
                },
                {
                  value: 15,
                  label: "Ngày 15",
                },
                {
                  value: 16,
                  label: "Ngày 16",
                },
                {
                  value: 17,
                  label: "Ngày 17",
                },
                {
                  value: 18,
                  label: "Ngày 18",
                },
                {
                  value: 19,
                  label: "Ngày 19",
                },
                {
                  value: 20,
                  label: "Ngày 20",
                },
                {
                  value: 21,
                  label: "Ngày 21",
                },
                {
                  value: 22,
                  label: "Ngày 22",
                },
                {
                  value: 23,
                  label: "Ngày 23",
                },
                {
                  value: 24,
                  label: "Ngày 24",
                },
                {
                  value: 25,
                  label: "Ngày 25",
                },
                {
                  value: 26,
                  label: "Ngày 26",
                },
                {
                  value: 27,
                  label: "Ngày 27",
                },
                {
                  value: 28,
                  label: "Ngày 28",
                },
                {
                  value: 29,
                  label: "Ngày 29",
                },
                {
                  value: 30,
                  label: "Ngày 30",
                },
                {
                  value: 31,
                  label: "Ngày 31",
                },
              ]}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ListOrder;
