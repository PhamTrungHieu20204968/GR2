import TextArea from "antd/es/input/TextArea";
import { Avatar, message } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import React, { useState } from "react";

import {
  useCreateCommentMutation,
  useUpdateCommentMutation,
} from "app/api/commentService";

function UserComment({ user, blogId, reply, edit, setEdit }) {
  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const { userId, accessToken } = useSelector((state) => state.auth);
  const [content, setContent] = useState(edit?.status ? edit?.content : "");
  const handleSubmit = () => {
    const parent = reply?.commentId || 0;
    if (content.trim()) {
      createComment({
        data: {
          content: content.trim(),
          userId,
          parent,
        },
        blogId,
        headers: {
          accessToken,
        },
      })
        .then((res) => {
          if (res.data?.error) {
            message.error(res.data.error);
          } else {
            setContent("");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleUpdateComment = () => {
    if (content.trim())
      updateComment({
        id: edit.id,
        data: {
          content: content,
          edited: 1,
        },
        headers: {
          accessToken,
        },
      })
        .then((res) => {
          if (res.data?.error) {
            message.error(res.data.error);
          } else {
            message.success("Đã cập nhật");
            setContent("");
            setEdit({ status: false, content: "", id: 0 });
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <div className='mt-4 flex items-center relative'>
      {user?.avatar ? (
        <Avatar
          className='mr-4'
          size='default'
          style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          src={user?.avatar}
        ></Avatar>
      ) : (
        <Avatar
          className='mr-4'
          size='default'
          style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
        >
          {user?.name[0]}
        </Avatar>
      )}
      <TextArea
        placeholder={
          reply?.user ? `Phản hồi ${reply?.user}` : "Nhập bình luận của bạn ..."
        }
        autoSize={{
          minRows: 1,
        }}
        className='flex-1 pr-8 rounded-2xl'
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />

      <SendOutlined
        className='ml-1 text-lg cursor-pointer text-primary absolute right-2 bottom-0 mb-2 hover:scale-110'
        onClick={edit?.status ? handleUpdateComment : handleSubmit}
      />
    </div>
  );
}

export default UserComment;
