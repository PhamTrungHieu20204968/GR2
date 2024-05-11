import {
  Button,
  DatePicker,
  InputNumber,
  Modal,
  Segmented,
  Select,
  Table,
  message,
} from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import {
  useDeleteRemindMutation,
  useGetUserRemindQuery,
} from "app/api/notificationService";
function Remind() {
  const { accessToken, notificationSetting } = useSelector(
    (state) => state.auth
  );
  const [currentCart, setCurrentCart] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState(1);
  const [sendTime, setSendTime] = useState("");
  const [deleteRemind] = useDeleteRemindMutation();
  const { data } = useGetUserRemindQuery({
    headers: {
      accessToken,
    },
  });

  const handleDeleteRemind = (id) => {
    deleteRemind({
      id,
    })
      .then((res) => {
        if (res.data?.error) {
          console.log(res.data?.error);
        } else message.success("Thành công");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentCart(null);
    setUserInfo(null);
    setTab(1);
    setSendTime("");
  };

  const handleUpdateRemind = (row) => {
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

  const handleOk = () => {
    if (!sendTime) {
      message.error("Vui lòng chọn thời gian!");
      return;
    }
    const totalCost = currentCart.reduce((total, item) => {
      return total + parseInt(item.price) * item.orderQuantity;
    }, 0);
  };

  const decodeCronString = (cronString) => {
    const arr = cronString.split(" ") || [];
    if (arr[2].includes("*")) {
      const res = arr[4]
        .split(",")
        .sort()
        .reduce((str, item, i) => {
          if (item === "0") {
            return i === 0 ? str + "Chủ nhật" : str + ",Chủ nhật";
          } else
            return i === 0
              ? str + "Thứ " + (parseInt(item) + 1)
              : str + ",Thứ " + (parseInt(item) + 1);
        }, "");

      return res + " hàng tuần";
    } else {
      return `Ngày ${arr[2]} hàng tháng`;
    }
  };

  const columns = [
    {
      title: "Thời gian nhận",
      key: "sendTime",
      dataIndex: "sendTime",
    },
    {
      title: "Thời gian lặp",
      key: "repeatTime",
      render: (_, record) => {
        if (record.repeatTime.includes("*")) {
          return decodeCronString(record.repeatTime);
        } else return "1 lần";
      },
    },

    {
      title: "Hành động",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_, record) => {
        return (
          <div className='flex gap-4'>
            <Button
              type='primary'
              onClick={() => handleUpdateRemind(record?.order)}
            >
              Sửa
            </Button>
            <Button
              type='primary'
              danger
              onClick={() => handleDeleteRemind(record.order.id)}
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];

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
        dataSource={row?.order?.orderItems?.map((item) => ({
          ...item,
          key: item.id,
        }))}
        pagination={false}
        size='small'
      />
    );
  };

  if (!data || data.error) {
    return <></>;
  }
  return (
    <div>
      <div className='text-2xl font-bold mb-4'>Danh sách lời nhắc</div>

      <Table
        columns={columns}
        dataSource={data?.map((item) => ({ ...item, key: item.id }))}
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
                  const sortedValue = value?.sort(function (a, b) {
                    return a - b;
                  });
                  setSendTime(`0 0 ${sortedValue.join(",")} * *`);
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

export default Remind;
