import React, { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Modal, Radio, Space, Tooltip, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import NotifiItem from "./NotifiItem";
import { useUpdateUserMutation } from "app/api/userService";
import { setUser } from "app/slices/authSlice";

function ListNotifications({ data }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [update] = useUpdateUserMutation();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [value, setValue] = useState(auth.notificationSetting);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    update({
      data: { notificationSetting: value },
      id: auth.userId,
      headers: {
        accessToken: auth.accessToken,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          if (auth.language === "vi") message.error(res.data.error);
          else message.error("変更の保存に失敗しました！");
        } else {
          if (auth.language === "vi") {
            message.success("Lưu thay đổi thành công!");
          } else message.success("変更が保存されました！");
          dispatch(setUser({ ...auth, notificationSetting: value }));
          setOpen(false);
        }
      })
      .catch((err) => {
        if (auth.language === "vi") {
          message.error("Lưu thay đổi thất bại!");
        } else message.error("変更の保存に失敗しました！");
        console.log(err);
      });
    setConfirmLoading(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className='p-2 w-60'>
      <div className='flex text-xl items-center w-full justify-between pb-2 border-b-2'>
        <div className='font-bold'>
          {auth.language === "vi" ? "Thông báo" : "お知らせ"}
        </div>
        <Tooltip
          title={auth.language === "vi" ? "Cài đặt" : "設定"}
          placement='bottom'
          color='#666'
        >
          <SettingOutlined
            className='cursor-pointer hover:bg-gray-300 p-2 rounded-full'
            onClick={showModal}
          />
        </Tooltip>
      </div>
      <div className='max-h-[400px] overflow-y-auto'>
        {data?.map((item) => (
          <NotifiItem key={item.id} notification={item} />
        ))}
      </div>
      <Modal
        title={auth.language === "vi" ? "Cài đặt thông báo" : "通知設定"}
        open={open}
        onOk={handleOk}
        okText={auth.language === "vi" ? "Lưu" : "保存"}
        cancelText={auth.language === "vi" ? "Hủy" : "キャンセル"}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Radio.Group onChange={onChange} value={value}>
          <Space direction='vertical'>
            <Radio value={0}>
              <div className='text-lg font-semibold'>
                {auth.language === "vi"
                  ? "Nhận tất cả thông báo"
                  : "全部通知を受ける"}
              </div>
              <div className=''>
                {auth.language === "vi"
                  ? "Bạn sẽ nhận được thông báo từ bài viết,đơn hàng,bình luận,lời　nhắc..."
                  : "注文、ブログ、コメント 、リマインダー から通知を受ける"}
              </div>
            </Radio>
            <Radio value={2}>
              <div className='text-lg font-semibold'>
                {auth.language === "vi"
                  ? "Nhận thông báo đơn hàng"
                  : "注文から通知を受ける"}
              </div>
              <div className=''>
                {auth.language === "vi"
                  ? "Bạn sẽ chỉ nhận được thông báo về đơn hàng và lời nhắc"
                  : "注文とリマインダーから通知を受ける"}
              </div>
            </Radio>
            <Radio value={10}>
              <div className='text-lg font-semibold'>
                {auth.language === "vi" ? "Tắt thông báo" : "通知をオフにする"}
              </div>
              <div className=''>
                {auth.language === "vi"
                  ? "Bạn sẽ không nhận thông báo nào cả"
                  : "何も通知を受けない"}
              </div>
            </Radio>
          </Space>
        </Radio.Group>
      </Modal>
    </div>
  );
}

export default ListNotifications;
