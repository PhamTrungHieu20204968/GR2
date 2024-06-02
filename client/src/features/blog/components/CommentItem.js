import { Avatar, message, Spin, Popover, Popconfirm } from "antd";
import React, { useContext, useState } from "react";
import { LikeTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import {
  useCreateLikeMutation,
  useDeleteCommentLikeMutation,
} from "app/api/likeService";
import { useDeleteCommentMutation } from "app/api/commentService";
import UserComment from "../components/UserComment";
import { useGetCommentChildQuery } from "app/api/commentService";
import { socketContext } from "components/SocketProvider";

function CommentItem({ comment, user, setEdit, blogId }) {
  const [createLike] = useCreateLikeMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [deleteCommentLike] = useDeleteCommentLikeMutation();
  const { accessToken, userId, name, language } = useSelector(
    (state) => state.auth
  );
  const socket = useContext(socketContext);
  const [liked, setLiked] = useState(
    !userId && !comment?.CommentId
      ? false
      : comment?.CommentId?.filter(
          (item) => item.commentId === comment.id && item.userId === userId
        ).length > 0
  );

  const { data, isLoading, isError } = useGetCommentChildQuery({
    id: comment.id,
  });

  const [reply, setReply] = useState({
    status: false,
    commentId: 0,
    userName: "",
    userId: 0,
  });

  function getDate(time) {
    const today = new Date(time);
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }
  const handleLikeComment = () => {
    if (!accessToken) {
      message.info(
        language === "vi" ? "Bạn chưa đăng nhập!" : "ログインしていません!"
      );
      return;
    }
    if (!liked) {
      createLike({
        data: {
          commentId: comment.id,
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
            socket?.emit("new-notification", {
              receiverId: comment.userId,
              content: `${name} đã thích bình luận của bạn`,
              blogId,
              senderId: userId,
              type: 1,
            });
            setLiked(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      deleteCommentLike({
        id: comment.id,
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
            setLiked(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleOnReply = () => {
    setReply({
      status: true,
      userName: comment.user.name,
      commentId: comment.id,
      userId: comment.userId,
    });
  };

  if (isLoading) {
    return <Spin />;
  }

  if (isError || data.error) {
    return <div>no data</div>;
  }

  const onDeleteComment = (e) => {
    if (!accessToken) {
      message.info(
        language === "vi" ? "Bạn chưa đăng nhập!" : "ログインしていません!"
      );
      return;
    }
    deleteComment({
      id: comment.id,
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
          message.success(language === "vi" ? "Xóa thành công" : "削除に成功しました");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='flex mb-4'>
      <div>
        {comment.user.avatar ? (
          <Avatar
            className='mr-2'
            size='large'
            style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
            src={comment.user.avatar}
          ></Avatar>
        ) : (
          <Avatar
            className='mr-2'
            size='large'
            style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          >
            {comment.user.name[0]}
          </Avatar>
        )}
      </div>
      <div className='flex-1'>
        <div className='bg-gray-200 rounded-lg p-2 text-base'>
          <div className='font-semibold'>
            <div className='flex items-center justify-between'>
              {comment.user.name}
              {accessToken && comment?.userId === userId && (
                <Popover
                  content={
                    <div className='w-fit'>
                      <div
                        className='cursor-pointer p-2 rounded-md font-semibold hover:bg-gray-200'
                        onClick={() =>
                          setEdit({
                            status: true,
                            content: comment.content,
                            id: comment.id,
                          })
                        }
                      >
                        {language === "vi" ? "Chỉnh sửa" : "編集"}
                      </div>
                      <Popconfirm
                        title='Xóa bình luận?'
                        description='Bạn muốn xóa bình luận này?'
                        onConfirm={onDeleteComment}
                        okText={language === "vi" ? "Có" : "オーケー"}
                        cancelText={language === "vi" ? "Không" : "いいえ"}
                      >
                        <div className='cursor-pointer p-2 rounded-md font-semibold hover:bg-gray-200'>
                          {language === "vi" ? "Xóa" : "削除"}
                        </div>
                      </Popconfirm>
                    </div>
                  }
                  trigger='click'
                >
                  <EllipsisOutlined className='cursor-pointer rounded-full hover:bg-gray-300' />
                </Popover>
              )}
            </div>
          </div>
          <div>{comment.content}</div>
        </div>

        <div className='text-xs flex justify-between'>
          <div className='flex gap-2'>
            <span>{getDate(comment.createdAt)}</span>
            <span
              className={`font-bold hover:underline cursor-pointer ${
                liked ? "text-blue-400" : ""
              }`}
              onClick={handleLikeComment}
            >
              {liked
                ? language === "vi"
                  ? "Đã thích"
                  : "いいねした"
                : language === "vi"
                ? "Thích"
                : "いいね"}
            </span>
            {!comment.parent && (
              <span
                className='font-bold hover:underline cursor-pointer'
                onClick={handleOnReply}
              >
                {language === "vi" ? "Phản hồi" : "返事"}
              </span>
            )}
            <span>{comment.edited ? "Đã chỉnh sửa" : ""}</span>
          </div>
          {comment.CommentId && (
            <div className='flex items-center gap-1'>
              {comment.CommentId.length}
              <LikeTwoTone />
            </div>
          )}
        </div>

        <div>
          {!data.error && data.length > 0 && (
            <div className='mt-4'>
              {data.map((item) => (
                <CommentItem
                  key={item.id}
                  comment={item}
                  user={item.user}
                  setEdit={setEdit}
                />
              ))}
            </div>
          )}
          {reply.status && (
            <UserComment
              blogId={comment.blogId}
              user={user}
              reply={reply}
              receiverId={comment.userId}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
