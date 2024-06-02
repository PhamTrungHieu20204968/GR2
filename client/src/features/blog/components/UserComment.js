import TextArea from "antd/es/input/TextArea";
import { Avatar, message } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import React, { useContext, useState } from "react";

import {
  useCreateCommentMutation,
  useUpdateCommentMutation,
} from "app/api/commentService";
import { socketContext } from "components/SocketProvider";

function UserComment({ user, blogId, reply, edit, setEdit, receiverId }) {
  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const { userId, accessToken, name, language } = useSelector(
    (state) => state.auth
  );
  const [content, setContent] = useState(edit?.status ? edit?.content : "");
  const socket = useContext(socketContext);
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
            if (language === "vi") {
              message.error(res.data.error);
            } else message.error("失敗しました");
          } else {
            setContent("");
            if (userId !== receiverId) {
              socket?.emit("new-notification", {
                receiverId,
                content: reply?.status
                  ? `${name} đã phản hồi 1 bình luận của bạn`
                  : `${name} đã bình luận bài viết của bạn`,
                blogId,
                senderId: userId,
                commentId: res.data,
                type: 2,
              });
            }
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
            if (language === "vi") {
              message.error(res.data.error);
            } else message.error("失敗しました");
          } else {
            message.success(
              language === "vi" ? "Cập nhật thành công" : "修正に成功しました"
            );
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
          reply?.userName
            ? language === "vi"
              ? `Phản hồi ${reply?.userName}`
              : `${reply?.userName}に返事する`
            : language === "vi"
            ? "Nhập bình luận của bạn ..."
            : `コメントを入力。。。`
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
