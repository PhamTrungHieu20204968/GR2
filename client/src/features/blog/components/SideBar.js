import React, { useState } from "react";
import { Input } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function SideBar({ tab, setTab, filter, setFilter }) {
  const { language } = useSelector((state) => state.auth);

  const [openSearch, setOpenSearch] = useState(false);
  return (
    <div className='w-full p-4 border-2'>
      <div
        className={`font-bold relative uppercase py-4 border-b-2 before:bottom-0 cursor-pointer hover:text-pink-400 ${
          tab === 1 && "text-primary"
        }`}
        onClick={() => setTab(1)}
      >
        {language === "vi" ? "Bài viết mới nhất" : "最新のブログ"}
      </div>
      <div
        className={`font-bold relative uppercase py-4 border-b-2 before:bottom-0 cursor-pointer hover:text-pink-400 ${
          tab === 2 && "text-primary"
        }`}
        onClick={() => setTab(2)}
      >
        {language === "vi" ? "Bài viết của tôi" : "私のブログ"}
      </div>
      <div
        className={`font-bold relative uppercase py-4 border-b-2 before:bottom-0 cursor-pointer hover:text-pink-400 ${
          tab === 3 && "text-primary"
        }`}
        onClick={() => setTab(3)}
      >
        {language === "vi" ? "Bài viết đã thích" : "いいねしたブログ"}
      </div>
      <div
        className={`font-bold relative uppercase py-4 border-b-2 before:bottom-0 cursor-pointer hover:text-pink-400 ${
          tab === 4 && "text-primary"
        }`}
        onClick={() => setTab(4)}
      >
        {language === "vi" ? " Tạo bài viết" : "ブログを作る"}
      </div>

      <div className='mt-4 transition-all'>
        <div className='font-bold text-lg flex items-center justify-between'>
          <span>
            {language === "vi" ? " Tìm kiếm bài viết" : "ブログを検索"}
          </span>
          {openSearch ? (
            <UpOutlined
              className='p-2 rounded-full hover:bg-gray-200'
              onClick={() => setOpenSearch(false)}
            />
          ) : (
            <DownOutlined
              className='p-2 rounded-full hover:bg-gray-200'
              onClick={() => setOpenSearch(true)}
            />
          )}
        </div>
        {openSearch ? (
          <>
            <div className=' mb-4 last:mb-0 fade-in'>
              <div className='mb-2'>
                {language === "vi"
                  ? "Tìm kiếm tên người dùng:"
                  : "ユーザー名を検索："}
              </div>
              <Input
                placeholder={
                  language === "vi"
                    ? "Nhập tên người dùng..."
                    : "ユーザー名を入力。。。"
                }
                allowClear
                value={filter?.userName}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, userName: e.target.value }))
                }
              />
            </div>
            <div className=' mb-4 last:mb-0 fade-in'>
              <div className='mb-2'>
                {language === "vi" ? "Tìm kiếm tiêu đề:" : "タイトルを検索："}
              </div>
              <Input
                placeholder={
                  language === "vi"
                    ? "Nhập tiêu đề bài viết..."
                    : "タイトルを入力。。。"
                }
                allowClear
                value={filter?.title}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className=' mb-4 last:mb-0 fade-in'>
              <div className='mb-2'>
                {language === "vi"
                  ? "Tìm kiếm hastag:"
                  : "ハッシュタグを検索："}
              </div>
              <Input
                placeholder={
                  language === "vi" ? "Nhập hastag..." : "ハッシュタグを検索："
                }
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
