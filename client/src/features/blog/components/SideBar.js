import React, { useState } from "react";
import { Input } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

function SideBar({ tab, setTab, filter, setFilter }) {
  const [openSearch, setOpenSearch] = useState(false);
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

      <div className='mt-4 transition-all'>
        <div className='font-bold text-lg flex items-center justify-between'>
          <span>Tìm kiếm bài viết</span>
          {openSearch ? (
            <UpOutlined className="p-2 rounded-full hover:bg-gray-200" onClick={() => setOpenSearch(false)} />
          ) : (
            <DownOutlined className="p-2 rounded-full hover:bg-gray-200" onClick={() => setOpenSearch(true)} />
          )}
        </div>
        {openSearch ? (
          <>
            <div className=' mb-4 last:mb-0 fade-in'>
              <div className='mb-2'>Tìm kiếm tên người dùng:</div>
              <Input
                placeholder='Nhập tên người dùng...'
                allowClear
                value={filter?.userName}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, userName: e.target.value }))
                }
              />
            </div>
            <div className=' mb-4 last:mb-0 fade-in'>
              <div className='mb-2'>Tìm kiếm tiêu đề:</div>
              <Input
                placeholder='Nhập tiêu đề bài viết...'
                allowClear
                value={filter?.title}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className=' mb-4 last:mb-0 fade-in'>
              <div className='mb-2'>Tìm kiếm hastag:</div>
              <Input
                placeholder='Nhập hastag...'
                allowClear
                value={filter?.tag}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, tag: e.target.value }))
                }
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SideBar;
