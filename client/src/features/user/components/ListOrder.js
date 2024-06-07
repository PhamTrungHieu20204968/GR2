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
  const { accessToken, userId, language } = useSelector((state) => state.auth);
  const { data } = useGetUserOrdersQuery({
    accessToken,
  });
  const socket = useContext(socketContext);
  const [currentCart, setCurrentCart] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userCreate] = useUserCreateOrderMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState(1);
  const [sendTime, setSendTime] = useState("");
  if (!data || data.error) {
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
      message.error(language === "vi" ? "Vui lòng chọn thời gian" : "時間を選択してください");
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
  const columns = [
    {
      title: language === "vi" ? "Địa chỉ" : "アドレス",
      width: 200,
      key: "address",
      render: (_, record) => `${record?.address} - ${record?.city}`,
    },
    {
      title: language === "vi" ? "GIÁ" : "値段",
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
      title: language === "vi" ? "Ghi chú" : "メモ",
      key: "note",
      render: (_, record) => record?.note || "Không có",
      width: 200,
    },
    {
      title: language === "vi" ? "Trạng thái" : "ステータス",
      key: "status",
      width: 120,
      filters: [
        {
          text: language === "vi" ? "Đang xử lý" : "処理中",
          value: 1,
        },
        {
          text: language === "vi" ? "Đang giao hàng" : "配送中",
          value: 2,
        },
        {
          text: language === "vi" ? "Đã hoàn thành" : "完了",
          value: 3,
        },
      ],
      onFilter: (value, record) => record?.status === value,
      render: (_, record) => {
        if (record?.status < 2) {
          return language === "vi" ? "Đang xử lý" : "処理中";
        } else if (record?.status < 3) {
          return language === "vi" ? "Đang giao hàng" : "配送中";
        } else return language === "vi" ? "Đã hoàn thành" : "完了";
      },
    },
    {
      title: language === "vi" ? "Loại" : "種類",
      key: "type",
      render: (_, record) =>
        (record.type === 1 && language === "vi"
          ? "Thanh toán toàn bộ đơn hàng"
          : "全部支払う") ||
        (record.type === 2 && language === "vi"
          ? "Thanh toán 50% đơn hàng"
          : "半分支払う") ||
        (record.type === 3 && language === "vi"
          ? "Thanh toán khi nhận hàng"
          : "受けてから支払う"),
      width: 120,
    },

    {
      title: language === "vi" ? "Hành động" : "アクション",
      key: "action",
      fixed: "right",
      width: language === "vi" ? 160 : 200,
      render: (_, record) => {
        return (
          <Button type='primary' className="text-wrap" onClick={() => handleReOrder(record)}>
            {language === "vi" ? "Tạo lời nhắc" : "リマインダーを作成する"}
          </Button>
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
  return (
    <div className=''>
      <div className='text-2xl font-bold mb-4'>
        {language === "vi" ? "Danh sách đơn hàng" : "注文リスト"}
      </div>

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
        title={
          language === "vi"
            ? "'Tạo lời nhắc cho đơn hàng'"
            : "注文のリマインダーを作成する"
        }
        open={isModalOpen}
        onOk={handleOk}
        okText={language === "vi" ? "Tạo lời nhắc" : "作成する"}
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
          defaultValue={1}
          style={{
            marginBottom: 16,
          }}
          onChange={(value) => {
            setTab(value);
            setSendTime("");
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
              value={sendTime ? dayjs(sendTime, "YYYY-MM-DD") : null}
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

export default ListOrder;
