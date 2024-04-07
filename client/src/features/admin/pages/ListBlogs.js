import React, { useState } from "react";
import { Row, Col, Input } from "antd";

import ListBlog from "features/blog/components/ListBlog";
import Sidebar from "../components/Sidebar";
import { useGetAllBlogsQuery } from "app/api/blogService";
function ListBlogs() {
  const { data } = useGetAllBlogsQuery();
  const [filter, setFilter] = useState({ userName: "", title: "", tag: "" });
  return (
    <div className='w-full h-screen overflow-y-auto overflow-x-hidden'>
      <div className='container mx-auto mt-8 overflow-hidden'>
        <Row gutter={16} className='pr-4'>
          <Col span={6}>
            <Sidebar SelectedKey='4' OpenKeys={["sub3"]}></Sidebar>
          </Col>
          <Col span={18}>
            <div className='my-8'>
              <div className='text-3xl font-bold mb-4'>Danh sách bài viết</div>
              <div className='flex items-center gap-4'>
                <div className='flex-1 flex flex-col'>
                  <div className='mb-2'>Tìm kiếm tên người dùng:</div>
                  <Input
                    placeholder='Nhập tên người dùng...'
                    allowClear
                    value={filter?.userName}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        userName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className='flex-1 flex flex-col'>
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
                <div className='flex-1 flex flex-col'>
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
              </div>
            </div>
            <ListBlog
              key={1}
              data={data
                .filter((item) =>
                  item.user.name
                    .toUpperCase()
                    .includes(filter?.userName.trim().toUpperCase())
                )
                .filter((item) =>
                  item.title
                    .toUpperCase()
                    .includes(filter?.title.trim().toUpperCase())
                )
                .filter((item) =>
                  item.tag
                    .toUpperCase()
                    .includes(filter?.tag.trim().toUpperCase())
                )}
              filter={filter}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ListBlogs;
