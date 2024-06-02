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
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import {
  useDeleteRemindMutation,
  useGetUserRemindQuery,
  useUpdateRemindMutation,
} from "app/api/notificationService";
import { socketContext } from "components/SocketProvider";
function Remind() {
  const { accessToken, userId, language } = useSelector((state) => state.auth);
  const [currentCart, setCurrentCart] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState(1);
  const [sendTime, setSendTime] = useState("");
  const [deleteRemind] = useDeleteRemindMutation();
  const [updateRemind] = useUpdateRemindMutation();
  const socket = useContext(socketContext);
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
        } else
          message.success(language === "vi" ? "Thành công" : "成功しました");
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
    setSendTime(null);
  };

  const handleUpdateRemind = (row, _sendTime, _repeatTime) => {
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
      userId: row.userId,
      totalMoney: 0,
      type: 0,
      status: 0,
      orderId: row.id,
    });
    if (_repeatTime.includes("*")) {
      if (_repeatTime[4] === "*") {
        setSendTime(
          _repeatTime
            .split(" ")[4]
            .split(",")
            .map((item) => +item)
        );
        setTab(2);
      } else {
        setSendTime(
          _repeatTime
            .split(" ")[2]
            .split(",")
            .map((item) => +item)
        );
        setTab(3);
      }
    } else setSendTime(_sendTime);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (!sendTime) {
      message.error(
        language === "vi" ? "Vui lòng chọn thời gian" : "時間を選択してください"
      );
      return;
    }
    const totalCost = currentCart.reduce((total, item) => {
      return total + parseInt(item.price) * item.orderQuantity;
    }, 0);

    updateRemind({
      data: {
        order: { ...userInfo, totalMoney: totalCost },
        cart: currentCart.map((item) => ({ ...item, id: item.productId })),
        sendTime,
      },
      id: userInfo.orderId,
      headers: {
        accessToken,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          message.error(
            language === "vi" ? "Tạo thất bại" : "作成に失敗しました"
          );
        } else {
          message.success(
            language === "vi" ? "Tạo thành công" : "作成に成功しました"
          );
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
        message.error(
          language === "vi" ? "Tạo thất bại" : "作成に失敗しました"
        );
        console.log(err);
      });
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
      title: language === "vi" ? "Thời gian nhận" : "受取時間",
      key: "sendTime",
      dataIndex: "sendTime",
    },
    {
      title: language === "vi" ? "Thời gian lặp" : "繰り返し時間",
      key: "repeatTime",
      render: (_, record) => {
        if (record.repeatTime.includes("*")) {
          return decodeCronString(record.repeatTime);
        } else return "1 lần";
      },
    },

    {
      title: language === "vi" ? "Hành động" : "アクション",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_, record) => {
        return (
          <div className='flex gap-4'>
            <Button
              type='primary'
              onClick={() =>
                handleUpdateRemind(
                  record?.order,
                  record.sendTime,
                  record.repeatTime
                )
              }
            >
              {language === "vi" ? "Sửa" : "編集する"}
            </Button>
            <Button
              type='primary'
              danger
              onClick={() => handleDeleteRemind(record.order.id)}
            >
              {language === "vi" ? "Xóa" : "削除する"}
            </Button>
          </div>
        );
      },
    },
  ];

  const cartColumns = [
    {
      title: language === "vi" ? "SẢN PHẨM" : "製品",
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
      title: language === "vi" ? "GIÁ" : "値段：",
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
      title: language === "vi" ? "SỐ LƯỢNG" : "量",
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
      title: language === "vi" ? "TỔNG CỘNG" : "合計",
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
        title: language === "vi" ? "Tên sản phẩm" : "製品名",
        key: "name",
        width: "50%",
        render: (_, record) => record.product.name,
      },
      {
        title: language === "vi" ? "Giá" : "値段：",
        key: "price",
        render: (_, record) =>
          parseInt(record.product.price).toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          }),
      },
      {
        title: language === "vi" ? "Số lượng" : "量",
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

  if (!data || data.error) {
    return <></>;
  }
  return (
    <div>
      <div className='text-2xl font-bold mb-4'>
        {language === "vi" ? "Danh sách lời nhắc" : "リマインダーの一覧"}
      </div>

      <Table
        columns={columns}
        dataSource={data?.map((item) => ({ ...item, key: item.id }))}
        expandable={{
          expandedRowRender,
        }}
      />
      <Modal
        title={
          language === "vi" ? "Chỉnh sửa lời nhắc" : "リマインダーを編集する"
        }
        open={isModalOpen}
        onOk={handleOk}
        okText={language === "vi" ? "Sửa lời nhắc" : "編集する"}
        cancelText={language === "vi" ? "Hủy" : "キャンセル"}
        onCancel={handleCancel}
      >
        <Table
          dataSource={currentCart?.map((item) => ({ ...item, key: item.id }))}
          columns={cartColumns}
          pagination={false}
        />
        <div className='my-4 text-base font-semibold'>
          {language === "vi" ? "Thiết lập thời gian" : "時間を設定する"}
        </div>
        <Segmented
          defaultValue={language === "vi" ? "Đặt 1 lần" : "一度だけ"}
          style={{
            marginBottom: 16,
          }}
          onChange={(value) => {
            setTab(value);
            setSendTime(null);
          }}
          value={tab}
          options={[
            { label: language === "vi" ? "Đặt 1 lần" : "一度だけ", value: 1 },
            { label: language === "vi" ? "Đặt hàng tuần" : "毎週", value: 2 },
            { label: language === "vi" ? "Đặt hàng tháng" : "毎月", value: 3 },
          ]}
        />
        {tab === 1 && (
          <div>
            {language === "vi" ? " Đặt 1 lần vào:" : "一度だけ："}
            <DatePicker
              onChange={(value) => {
                if (value) {
                  setSendTime(value?.format("YYYY-MM-DD"));
                } else setSendTime("");
              }}
              defaultValue={tab === 1 ? sendTime : null}
              size='small'
              minDate={dayjs(dayjs(Date.now()).add(1, "day"), "YYYY-MM-DD")}
              inputReadOnly
              className='ml-4'
              placeholder={language === "vi" ? "Chọn ngày ..." : "日時を選ぶ"}
            />
          </div>
        )}
        {tab === 2 && (
          <div className='flex items-center'>
            <span>{language === "vi" ? " Đặt hàng tuần vào:" : "毎週の"}</span>
            <Select
              placeholder={language === "vi" ? "Chọn ngày ..." : "日時を選ぶ"}
              mode='multiple'
              allowClear
              placement='topRight'
              className='ml-4 flex-1'
              defaultValue={tab === 2 ? sendTime : []}
              onChange={(value) => {
                if (value) {
                  setSendTime(`0 0 * * ${value.join(",")}`);
                } else setSendTime("");
              }}
              options={[
                {
                  value: 1,
                  label: language === "vi" ? "Thứ hai" : "月曜日",
                },
                {
                  value: 2,
                  label: language === "vi" ? "Thứ ba" : "火曜日",
                },
                {
                  value: 3,
                  label: language === "vi" ? "Thứ tư" : "水曜日",
                },
                {
                  value: 4,
                  label: language === "vi" ? "Thứ năm" : "木曜日",
                },
                {
                  value: 5,
                  label: language === "vi" ? "Thứ sáu" : "金曜日",
                },
                {
                  value: 6,
                  label: language === "vi" ? "Thứ bảy" : "土曜日",
                },
                {
                  value: 0,
                  label: language === "vi" ? "Chủ nhật" : "日曜日",
                },
              ]}
            />
          </div>
        )}
        {tab === 3 && (
          <div className='flex items-center'>
            <span>
              {language === "vi" ? "Đặt hàng tháng vào ngày::" : "毎月の"}
            </span>
            <Select
              placeholder={language === "vi" ? "Chọn ngày ..." : "日時を選ぶ"}
              mode='multiple'
              allowClear
              className='ml-4 flex-1'
              defaultValue={tab === 3 ? sendTime : []}
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
                  label: language === "vi" ? "Ngày 1" : "1日",
                },
                {
                  value: 2,
                  label: language === "vi" ? "Ngày 2" : "2日",
                },
                {
                  value: 3,
                  label: language === "vi" ? "Ngày 3" : "3日",
                },
                {
                  value: 4,
                  label: language === "vi" ? "Ngày 4" : "4日",
                },
                {
                  value: 5,
                  label: language === "vi" ? "Ngày 5" : "5日",
                },
                {
                  value: 6,
                  label: language === "vi" ? "Ngày 6" : "6日",
                },
                {
                  value: 7,
                  label: language === "vi" ? "Ngày 7" : "7日",
                },
                {
                  value: 8,
                  label: language === "vi" ? "Ngày 8" : "8日",
                },
                {
                  value: 9,
                  label: language === "vi" ? "Ngày 9" : "9日",
                },
                {
                  value: 10,
                  label: language === "vi" ? "Ngày 10" : "10日",
                },
                {
                  value: 11,
                  label: language === "vi" ? "Ngày 11" : "11日",
                },
                {
                  value: 12,
                  label: language === "vi" ? "Ngày 12" : "12日",
                },
                {
                  value: 13,
                  label: language === "vi" ? "Ngày 13" : "13日",
                },
                {
                  value: 14,
                  label: language === "vi" ? "Ngày 14" : "14日",
                },
                {
                  value: 15,
                  label: language === "vi" ? "Ngày 15" : "15日",
                },
                {
                  value: 16,
                  label: language === "vi" ? "Ngày 16" : "16日",
                },
                {
                  value: 17,
                  label: language === "vi" ? "Ngày 17" : "17日",
                },
                {
                  value: 18,
                  label: language === "vi" ? "Ngày 18" : "18日",
                },
                {
                  value: 19,
                  label: language === "vi" ? "Ngày 19" : "19日",
                },
                {
                  value: 20,
                  label: language === "vi" ? "Ngày 20" : "20日",
                },
                {
                  value: 21,
                  label: language === "vi" ? "Ngày 21" : "21日",
                },
                {
                  value: 22,
                  label: language === "vi" ? "Ngày 22" : "22日",
                },
                {
                  value: 23,
                  label: language === "vi" ? "Ngày 23" : "23日",
                },
                {
                  value: 24,
                  label: language === "vi" ? "Ngày 24" : "24日",
                },
                {
                  value: 25,
                  label: language === "vi" ? "Ngày 25" : "25日",
                },
                {
                  value: 26,
                  label: language === "vi" ? "Ngày 26" : "26日",
                },
                {
                  value: 27,
                  label: language === "vi" ? "Ngày 27" : "27日",
                },
                {
                  value: 28,
                  label: language === "vi" ? "Ngày 28" : "28日",
                },
                {
                  value: 29,
                  label: language === "vi" ? "Ngày 29" : "29日",
                },
                {
                  value: 30,
                  label: language === "vi" ? "Ngày 30" : "30日",
                },
                {
                  value: 31,
                  label: language === "vi" ? "Ngày 31" : "31日",
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
