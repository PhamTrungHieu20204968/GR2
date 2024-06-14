import React from "react";
import { FloatButton, Popover } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import ChatBot from "react-simple-chatbot";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
const steps = [
  {
    id: "1",
    message: "MonaShop xin chào.",
    trigger: "2",
    hideInput: true,
  },
  {
    id: "2",
    message: "Tôi có thể giúp gì được cho bạn?",
    trigger: "3",
    hideInput: true,
  },

  {
    id: "3",
    options: [
      { value: 3, label: "Number 1", trigger: "4" },
      { value: 4, label: "Khác", trigger: "sorry" },
    ],
    hideInput: true,
  },
  {
    id: "4",
    message: "Tôi không biết?",
    trigger: "3",
    hideInput: true,
  },

  {
    id: "sorry",
    message: "Xin lỗi! Có vẻ tôi không thể giúp bạn.",
    trigger: "end",
    hideInput: true,
  },

  {
    id: "end",
    message: "Bạn vui lòng liên hệ trực tiếp với chúng tôi để được hỗ trợ",
    trigger: "contact",
    hideInput: true,
  },

  {
    id: "contact",
    options: [
      { value: 5, label: "Chưa biết cách liên hệ?", trigger: "navigate" },
    ],
    hideInput: true,
  },

  {
    id: "navigate",
    message: "Tôi sẽ chuyển hướng bạn đến trang liên hệ.",
    hideInput: true,
    end: true,
  },
];

function Layout({ children, page = ["home"] }) {
  const navigate = useNavigate();

  const handleEnd = ({ values }) => {
    if (values.pop() === 5) {
      setTimeout(() => {
        navigate("/contact");
      }, 2000);
    }
  };

  return (
    <div className='layout overflow-x-hidden flex flex-col h-screen w-full'>
      <Header page={page}></Header>
      <div className='mt-[70px] flex-1'>{children}</div>
      <Popover
        content={
          <ChatBot
            handleEnd={handleEnd}
            headerTitle='Hỗ trợ khách hàng'
            steps={steps}
            hideBotAvatar
            hideUserAvatar
            userDelay={0}
          />
        }
        trigger='click'
        placement='leftBottom'
      >
        <FloatButton
          icon={<RobotOutlined />}
          type='primary'
          className='right-10'
        />
      </Popover>
      <Footer page={page}></Footer>
    </div>
  );
}

export default Layout;
