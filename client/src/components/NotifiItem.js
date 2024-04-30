import { Avatar } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotifiItem({ notification }) {
  const navigate = useNavigate();

  function formatDateTime(datetime) {
    var hours = datetime.getHours();
    var minutes = datetime.getMinutes();
    var day = datetime.getDate();
    var month = datetime.getMonth() + 1;
    var year = datetime.getFullYear();

    // Add leading zeros if necessary
    var formattedHours = (hours < 10 ? "0" : "") + hours;
    var formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
    var formattedDay = (day < 10 ? "0" : "") + day;
    var formattedMonth = (month < 10 ? "0" : "") + month;

    return (
      formattedHours +
      ":" +
      formattedMinutes +
      " " +
      formattedDay +
      "-" +
      formattedMonth +
      "-" +
      year
    );
  }

  function timeAgoOrDateTime(datetimeString) {
    var datetime = new Date(datetimeString);
    var now = new Date();

    var elapsed = now - datetime;

    var seconds = Math.floor(elapsed / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    if (days > 0) {
      return formatDateTime(datetime);
    } else if (hours > 0) {
      return hours + " giờ trước";
    } else if (minutes > 0) {
      return minutes + " phút trước";
    } else {
      return "Vừa xong";
    }
  }

  const hanldeClickNotification = () => {
    if (notification?.blogId) {
      navigate(`/blogs/detail/${notification.blogId}`);
    }
  };
  return (
    <div
      className='flex items-center p-2 gap-4 mt-2 cursor-pointer hover:bg-gray-200 rounded-lg'
      onClick={hanldeClickNotification}
    >
      <div className=''>
        {notification?.Sender?.avatar ? (
          <Avatar
            className='text-center'
            size='default'
            style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
            src={notification?.Sender?.avatar}
          ></Avatar>
        ) : (
          <Avatar
            className='text-center'
            size='default'
            style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          >
            {notification?.Sender?.name[0]}
          </Avatar>
        )}
      </div>
      <div className='flex-1'>
        <div className=''>{notification?.content}</div>
        <div className='text-gray-400 text-xs'>
          {timeAgoOrDateTime(notification?.createdAt)}
        </div>
      </div>
    </div>
  );
}

export default NotifiItem;
