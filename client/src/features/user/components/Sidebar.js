import React from "react";
import { useSelector } from "react-redux";

function Sidebar({ tab, setTab }) {
  const { language } = useSelector((state) => state.auth);
  return (
    <div className='w-full p-4 border-2'>
      <div
        className={`font-bold relative uppercase py-4 border-b-2 before:bottom-0 cursor-pointer hover:text-pink-400 ${
          tab === 1 && "text-primary"
        }`}
        onClick={() => setTab(1)}
      >
        {language === "vi" ? "Thông tin cá nhân" : "自己情報"}
      </div>
      <div
        className={`font-bold relative uppercase py-4 border-b-2 before:bottom-0 cursor-pointer hover:text-pink-400 ${
          tab === 2 && "text-primary"
        }`}
        onClick={() => setTab(2)}
      >
        {language === "vi" ? "Đổi mật khẩu" : "パスワードを変更する"}
      </div>
      <div
        className={`font-bold relative uppercase py-4 border-b-2 before:bottom-0 cursor-pointer hover:text-pink-400 ${
          tab === 3 && "text-primary"
        }`}
        onClick={() => setTab(3)}
      >
        {language === "vi" ? "Thông tin đơn hàng" : "注文リスト"}
      </div>
      <div
        className={`font-bold relative uppercase py-4 border-b-2 before:bottom-0 cursor-pointer hover:text-pink-400 ${
          tab === 4 && "text-primary"
        }`}
        onClick={() => setTab(4)}
      >
        {language === "vi" ? "Danh sách lời nhắc" : "リマインダーの一覧"}
      </div>
    </div>
  );
}

export default Sidebar;
