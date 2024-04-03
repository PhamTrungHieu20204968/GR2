import React from "react";

function SideBar({ tab, setTab }) {
  return (
    <div className='w-full p-4 border-2'>
      <div
        className={`font-bold relative uppercase py-4 border-b-2 before:bottom-0 cursor-pointer hover:text-pink-400 ${
          tab === 1 && "text-primary"
        }`}
        onClick={() => setTab(1)}
      >
        Bài viết mới nhất
      </div>
      <div
        className={`font-bold relative uppercase py-4 border-b-2 before:bottom-0 cursor-pointer hover:text-pink-400 ${
          tab === 2 && "text-primary"
        }`}
        onClick={() => setTab(2)}
      >
        Bài viết của tôi
      </div>
      <div
        className={`font-bold relative uppercase py-4 border-b-2 before:bottom-0 cursor-pointer hover:text-pink-400 ${
          tab === 3 && "text-primary"
        }`}
        onClick={() => setTab(3)}
      >
        Bài viết đã thích
      </div>
      <div
        className={`font-bold relative uppercase py-4 border-b-2 before:bottom-0 cursor-pointer hover:text-pink-400 ${
          tab === 4 && "text-primary"
        }`}
        onClick={() => setTab(4)}
      >
        Tạo bài viết
      </div>
    </div>
  );
}

export default SideBar;
