import { Badge, Popover, Tooltip } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BellOutlined } from '@ant-design/icons';

import ListNotifications from './ListNotifications';
import {
  useCreateNotificationMutation,
  useGetUserNotificationsQuery,
  useUpdateSeenNotificationMutation,
  useUpdateNotificationMutation,
  useUpdateScheduleNotificationsMutation,
} from 'app/api/notificationService';
import { socketContext } from './SocketProvider';

function Notifications() {
  const { accessToken, notificationSetting, language } = useSelector(
    (state) => state.auth
  );
  const socket = useContext(socketContext);
  const [create] = useCreateNotificationMutation();
  const [updateSeen] = useUpdateSeenNotificationMutation();
  const [updateNotification] = useUpdateNotificationMutation();
  const [
    updateScheduleNotifications,
  ] = useUpdateScheduleNotificationsMutation();
  const { data } = useGetUserNotificationsQuery({
    headers: {
      accessToken,
    },
  });
  const [filteredData, setFilteredData] = useState([]);

  const handleSeenNotifications = () => {
    if (filteredData?.filter((item) => item.status === 0)?.length > 0) {
      updateSeen({
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
  };

  useEffect(() => {
    socket?.on('receive-notification', (notification) => {
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

    socket?.on('one-time-notification', (notification) => {
      updateNotification({
        data: { type: notification.type },
        id: notification.notificationId,
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
    });

    socket?.on('repeat-notification', (notification) => {
      const currentDate = new Date(notification.sendTime);
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      updateNotification({
        data: {
          sendTime: formattedDate,
        },
        id: notification.notificationId,
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
    });
  }, [socket, notificationSetting]);

  useEffect(() => {
    if (data?.length > 0) {
      const currentDate = new Date(Date.now());
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      const notificationIds = [];
      const newData = data?.filter((item) => {
        if (item.type === 0 && !item.sendTime.includes('*')) {
          if (item.sendTime <= formattedDate) notificationIds.push(item.id);
          return false;
        } else return true;
      });
      setFilteredData(newData);
      if (notificationIds.length > 0) {
        updateScheduleNotifications({
          data: notificationIds,
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
    }
  }, [data, socket]);

  if (!data || data.error) {
    return <></>;
  }
  return (
    <Popover
      trigger="click"
      content={<ListNotifications data={filteredData} />}
    >
      <Badge count={filteredData?.filter((item) => item.status === 0)?.length}>
        <Tooltip
          title={language === 'vi' ? 'Thông báo' : 'お知らせ'}
          placement="bottom"
          color="#666"
          zIndex={60}
        >
          <BellOutlined
            className="text-2xl text-white font-bold cursor-pointer hover:text-primary"
            onClick={handleSeenNotifications}
          />
        </Tooltip>
      </Badge>
    </Popover>
  );
}

export default Notifications;
