import React from "react";

function Sidebar({ tab, setTab }) {
  return (
    <div className='w-full p-4 border-2'>
      <div
        className={`font-bold relative uppercase py-4 border-b-2 before:bottom-0 cursor-pointer hover:text-pink-400 ${
          tab === 1 && "text-primary"
        }`}
        onClick={() => setTab(1)}
      >
        Thông tin cá nhân
      </div>
      <div
        className={`font-bold relative uppercase py-4 border-b-2 before:bottom-0 cursor-pointer hover:text-pink-400 ${
          tab === 2 && "text-primary"
        }`}
        onClick={() => setTab(2)}
      >
        Đổi mật khẩu
      </div>
      <div
        className={`font-bold relative uppercase py-4 border-b-2 before:bottom-0 cursor-pointer hover:text-pink-400 ${
          tab === 3 && "text-primary"
        }`}
        onClick={() => setTab(3)}
      >
        Thông tin đơn hàng
      </div>
    </div>
  );
}

export default Sidebar;
