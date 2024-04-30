import { Badge, Popover, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BellOutlined } from "@ant-design/icons";

import ListNotifications from "./ListNotifications";
import {
  useCreateNotificationMutation,
  useGetUserNotificationsQuery,
  useUpdateSeenNotificationMutation,
} from "app/api/notificationService";
import { socketContext } from "./SocketProvider";

function Notifications() {
  const { accessToken, notificationSetting } = useSelector(
    (state) => state.auth
  );
  const [list, setList] = useState([]);
  const socket = useContext(socketContext);
  const [create] = useCreateNotificationMutation();
  const [update] = useUpdateSeenNotificationMutation();
  const { data } = useGetUserNotificationsQuery({
    headers: {
      accessToken,
    },
  });

  const handleSeenNotifications = () => {
    setList(data?.map((item) => ({ ...item, status: 1 })));
    if (data?.filter((item) => item.status === 0)?.length > 0) {
      update({
        headers: {
          accessToken,
        },
      })
        .then((res) => {
          if (res.data?.error) {
            console.log(res.data?.error);
          } else {
            console.log("updated");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    socket?.on("receive-notification", (notification) => {
      if (notificationSetting < notification.type) {
        create({
          data: { ...notification },
          headers: {
            accessToken,
          },
        })
          .then((res) => {
            if (res.data?.error) {
              console.log(res.data?.error);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }, [socket]);

  if (!data || data.error) {
    return <></>;
  }

  return (
    <Popover trigger='click' content={<ListNotifications data={data} />}>
      <Badge
        count={
          list.length < 1
            ? data?.filter((item) => item.status === 0)?.length
            : data.length - list.length
        }
      >
        <Tooltip title='Thông báo' placement='bottom' color='#666' zIndex={60}>
          <BellOutlined
            className='text-2xl text-white font-bold cursor-pointer hover:text-primary'
            onClick={handleSeenNotifications}
          />
        </Tooltip>
      </Badge>
    </Popover>
  );
}

export default Notifications;
