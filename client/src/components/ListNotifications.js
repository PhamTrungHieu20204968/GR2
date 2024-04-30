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
          message.error(res.data.error);
        } else {
          message.success("Lưu thay đổi thành công!");
          dispatch(setUser({ ...auth, notificationSetting: value }));
          setOpen(false);
        }
      })
      .catch((err) => {
        message.error("Lưu thay đổi thất bại!");
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
        <div className='font-bold'>Thông báo</div>
        <Tooltip title='Cài đặt' placement='bottom' color='#666'>
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
        title='Cài đặt thông báo'
        open={open}
        onOk={handleOk}
        okText={"Lưu"}
        cancelText={"Hủy"}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Radio.Group onChange={onChange} value={value}>
          <Space direction='vertical'>
            <Radio value={0}>
              <div className='text-lg font-semibold'>Nhận tất cả thông báo</div>
              <div className=''>
                Bạn sẽ nhận được thông báo từ bài viết,đơn hàng,bình luận,lời
                nhắc...
              </div>
            </Radio>
            <Radio value={2}>
              <div className='text-lg font-semibold'>
                Nhận thông báo đơn hàng
              </div>
              <div className=''>
                Bạn sẽ chỉ nhận được thông báo về đơn hàng và lời nhắc
              </div>
            </Radio>
            <Radio value={10}>
              <div className='text-lg font-semibold'>Tắt thông báo</div>
              <div className=''>Bạn sẽ không nhận thông báo nào cả</div>
            </Radio>
          </Space>
        </Radio.Group>
      </Modal>
    </div>
  );
}

export default ListNotifications;
