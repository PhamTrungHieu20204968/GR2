import { Popconfirm, message } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useDeleteBlogMutation } from 'app/api/blogService';
function BlogMenu({ blog }) {
  const [deleteBlog] = useDeleteBlogMutation();
  const { accessToken, userId, role, language } = useSelector(
    (state) => state.auth
  );
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
          if (language === 'vi') {
            message.error(res.data.error);
          } else message.error('失敗しました');
        } else {
          message.success(
            language === 'vi' ? 'Xóa thành công' : '削除に成功しました'
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="z-40">
      {(userId === blog.userId || role > 1) && (
        <div
          className="text-base mb-2 last:mb-0 cursor-pointer hover:bg-gray-200 rounded-md p-2"
          onClick={() => navigate(`/blogs/${blog.id}`)}
        >
          {language === 'vi' ? 'Sửa bài viết' : '編集する'}
        </div>
      )}
      {(userId === blog.userId || role > 1) && (
        <Popconfirm
          title="Xóa bài viết"
          description="Bạn muốn xóa bài viết này?"
          okText={language === 'vi' ? 'Có' : 'オーケー'}
          cancelText={language === 'vi' ? 'Không' : 'いいえ'}
          onConfirm={handleDeleteBlog}
        >
          <div className="text-base mb-2 text-red-500 last:mb-0 cursor-pointer hover:bg-gray-200 rounded-md p-2">
            {language === 'vi' ? 'Xóa bài viết' : '削除する'}
          </div>
        </Popconfirm>
      )}
    </div>
  );
}

export default BlogMenu;
