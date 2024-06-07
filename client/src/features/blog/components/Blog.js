import {
  Avatar,
  Image,
  Modal,
  message,
  Popover,
  Button,
  Popconfirm,
  Input,
  Space,
  Divider,
  Select,
} from "antd";
import React, { useContext, useRef, useState } from "react";
import {
  LikeOutlined,
  LikeFilled,
  ShareAltOutlined,
  CommentOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { FacebookShareButton } from "react-share";

import {
  useCreateLikeMutation,
  useDeleteBlogLikeMutation,
} from "app/api/likeService";
import BLogComments from "./BlogComments";
import BlogMenu from "./BlogMenu";
import { socketContext } from "components/SocketProvider";
import { useUpdateUnsafeBlogMutation } from "app/api/blogService";

let items = [
  "Nội dung nhạy cảm",
  "Spam",
  "Nội dung bạo lực",
  "Thông tin sai sự thật",
  "Bán hàng trái phép",
  "Nội dung liên quan đến chất cấm",
  "Nội dung chứa ngôn từ đả kích, thiếu văn hóa",
];

function Blog({ blog }) {
  const [createLike] = useCreateLikeMutation();
  const [deleteBlogLike] = useDeleteBlogLikeMutation();
  const [updateUnsafeBlog] = useUpdateUnsafeBlogMutation();
  const socket = useContext(socketContext);
  const inputRef = useRef(null);
  const { accessToken, userId, role, name, language } = useSelector(
    (state) => state.auth
  );
  const [liked, setLiked] = useState(
    !userId
      ? false
      : blog?.likes.filter(
          (item) => item.blogId === blog?.id && item.userId === userId
        ).length > 0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectBlogModalOpen, setIsRejectBlogModalOpen] = useState(false);
  const [issue, setIssue] = useState("");
  const [rejectIssue, setRejectIssue] = useState("");
  const [rejectStatus, setRejectStatus] = useState("");

  function getDate(time) {
    const today = new Date(time);
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }
  const handleLikeBlog = () => {
    if (!accessToken) {
      message.info(
        language === "vi" ? "Bạn chưa đăng nhập!" : "ログインしていません!"
      );
      return;
    }
    if (!liked) {
      createLike({
        data: {
          blogId: blog.id,
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
            setLiked(true);
            socket?.emit("new-notification", {
              receiverId: blog?.userId,
              content: `${name} đã thích bài viết của bạn`,
              blogId: blog.id,
              senderId: userId,
              type: 1,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      deleteBlogLike({
        id: blog.id,
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

  const handleAgreeBlog = () => {
    updateUnsafeBlog({
      id: blog?.id,
      data: {
        status: 1,
      },
      headers: {
        accessToken,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          message.error(res.data.error);
        } else {
          message.success(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showRejectMOdal = () => {
    setIsRejectBlogModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onIssueChange = (event) => {
    setIssue(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    if (issue) {
      items = [...items, issue];
      setIssue("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleRejectBlog = () => {
    if (!rejectIssue) {
      setRejectStatus("error");
      return;
    }
    updateUnsafeBlog({
      id: blog?.id,
      data: {
        status: -1,
      },
      headers: {
        accessToken,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          message.error(res.data.error);
        } else {
          message.success(res.data);
          socket?.emit("new-notification", {
            receiverId: blog.userId,
            content: `Yêu cầu đăng bài của bạn bị từ chối vì vi phạm: ${rejectIssue}`,
            blogId: blog.id,
            type: 4,
          });
          setRejectIssue("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='w-full max-w-xl mx-auto border-2 rounded-md p-4 mb-4 last:mb-0'>
      <div className='w-full flex justify-between items-center'>
        <div className='flex-1 flex '>
          {blog?.user.avatar ? (
            <Avatar
              className='mr-4'
              size='large'
              style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
              src={blog?.user.avatar}
            ></Avatar>
          ) : (
            <Avatar
              className='mr-4'
              size='large'
              style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
            >
              {blog?.user.name[0]}
            </Avatar>
          )}

          <div>
            <div className='font-semibold'>{blog?.user.name}</div>
            <div className='text-xs text-gray-400'>
              {getDate(blog?.createdAt)}
            </div>
          </div>
        </div>
        {userId === blog?.userId || role > 1 ? (
          <Popover
            content={<BlogMenu blog={blog} />}
            trigger='click'
            placement='leftTop'
          >
            <MoreOutlined className='text-base text-gray-500 p-2 rounded-full cursor-pointer rotate-90 hover:bg-gray-200 hover:text-black' />
          </Popover>
        ) : (
          <></>
        )}
      </div>
      <div className='mt-4 text-2xl font-bold'>{blog?.title}</div>
      <div
        className='unreset my-4'
        dangerouslySetInnerHTML={{ __html: blog?.content }}
      ></div>
      {blog?.images && (
        <Image.PreviewGroup>
          <div className='flex flex-wrap items-center'>
            {blog?.images.map((item) => (
              <Image
                key={item.id}
                src={item.url}
                width={blog?.images.length > 1 ? "50%" : "100%"}
                height={"100%"}
              />
            ))}
          </div>
        </Image.PreviewGroup>
      )}

      {blog?.tag && (
        <div className='italic underline text-blue-500 cursor-pointer mt-2'>
          #{blog?.tag}
        </div>
      )}

      {blog?.status === 0 ? (
        <div className='mt-2 flex gap-4'>
          <Popconfirm
            title='Đồng ý đăng bài viết này?'
            description='Bạn có chắc chắn đồng ý đăng bài viết này?'
            okText='Có'
            cancelText='Không'
            onConfirm={handleAgreeBlog}
          >
            <Button type='primary' className='flex-1'>
              Đồng ý
            </Button>
          </Popconfirm>
          <Button
            type='primary'
            className='flex-1'
            danger
            onClick={showRejectMOdal}
          >
            Từ chối
          </Button>
        </div>
      ) : (
        <div className='mt-2'>
          <div className='flex justify-between'>
            <div className=''>
              {blog?.likes.length +
                (language === "vi" ? " lượt thích" : "いいね")}
            </div>
            <div className=''>
              {blog?.comments.length +
                (language === "vi" ? " Bình luận" : "コメント")}
            </div>
          </div>
          <div className='flex border-y-2 font-semibold'>
            <div
              className={`flex-1 text-center py-2 my-[2px] cursor-pointer flex items-center gap-1 justify-center rounded-md hover:bg-gray-200 ${
                liked ? "text-blue-400" : ""
              }`}
              onClick={handleLikeBlog}
            >
              {liked ? <LikeFilled /> : <LikeOutlined />}
              {liked
                ? language === "vi"
                  ? "Đã thích"
                  : "いいねした"
                : language === "vi"
                ? "Thích"
                : "いいね"}
            </div>
            <div
              className='flex-1 text-center py-2 my-[2px] cursor-pointer flex items-center gap-1 justify-center rounded-md hover:bg-gray-200'
              onClick={showModal}
            >
              <CommentOutlined /> {language === "vi" ? "Bình luận" : "コメント"}
            </div>
            <div className='flex-1 text-center py-2 my-[2px] cursor-pointer flex items-center gap-1 justify-center rounded-md hover:bg-gray-200'>
              <FacebookShareButton
                url={`${window.location.href}/detail/${blog?.id}`}
                hashtag={blog?.tag}
              >
                <ShareAltOutlined />
                {language === "vi" ? "Chia sẻ" : "シェア"}
              </FacebookShareButton>
            </div>
          </div>
        </div>
      )}

      <Modal
        title={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={null}
        footer={null}
      >
        <BLogComments
          blog={blog}
          comments={blog?.comments.filter((item) => item.parent === 0)}
          handleCancel={handleCancel}
        />
      </Modal>

      <Modal
        title={"Từ chối đăng bài viết"}
        open={isRejectBlogModalOpen}
        onOk={handleRejectBlog}
        okText='Gửi'
        cancelText='Hủy'
        onCancel={() => {
          setIsRejectBlogModalOpen(false);
          setRejectStatus("");
        }}
        closeIcon={null}
      >
        <div className='mb-4'>Hãy chọn nội dung vi phạm :</div>
        <Select
          className='w-full'
          mode='multiple'
          status={rejectStatus}
          placeholder='Nội dung vi phạm'
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider
                style={{
                  margin: "8px 0",
                }}
              />
              <div className='w-full flex'>
                <Input
                  placeholder='Nội dung khác'
                  ref={inputRef}
                  value={issue}
                  onChange={onIssueChange}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <Button type='text' icon={<PlusOutlined />} onClick={addItem}>
                  Add item
                </Button>
              </div>
            </>
          )}
          options={items.map((item) => ({
            label: item,
            value: item,
          }))}
          onChange={(e) => {
            setRejectIssue(e.join());
            setRejectStatus("");
          }}
        />

        {rejectStatus === "error" && (
          <div className='text-red-500 mt-2'>
            Vui lòng chọn ít nhất 1 nội dung!
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Blog;
