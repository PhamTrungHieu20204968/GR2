import { Popconfirm, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDeleteBlogMutation } from "app/api/blogService";
function BlogMenu({ blog }) {
  const [deleteBlog] = useDeleteBlogMutation();
  const { accessToken, userId, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleDeleteBlog = () => {
    deleteBlog({
      id: blog.id,
      headers: {
        accessToken,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          message.error(res.data.error);
        } else {
          message.success("Xóa thành công");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(blog);
  return (
    <div className='z-40'>
      <div className='text-base mb-2 last:mb-0 cursor-pointer hover:bg-gray-200 rounded-md p-2'>
        Báo cáo bài viết
      </div>
      {(userId === blog.userId || role > 1) && (
        <div className='text-base mb-2 last:mb-0 cursor-pointer hover:bg-gray-200 rounded-md p-2'>
          Gỡ bài viết
        </div>
      )}
      {(userId === blog.userId || role > 1) && (
        <div
          className='text-base mb-2 last:mb-0 cursor-pointer hover:bg-gray-200 rounded-md p-2'
          onClick={() => navigate(`/blogs/${blog.id}`)}
        >
          Sửa bài viết
        </div>
      )}
      {(userId === blog.userId || role > 1) && (
        <Popconfirm
          title='Xóa bài viết'
          description='Bạn muốn xóa bài viết này?'
          okText='Có'
          cancelText='Không'
          onConfirm={handleDeleteBlog}
        >
          <div className='text-base mb-2 text-red-500 last:mb-0 cursor-pointer hover:bg-gray-200 rounded-md p-2'>
            Xóa bài viết
          </div>
        </Popconfirm>
      )}
    </div>
  );
}

export default BlogMenu;
