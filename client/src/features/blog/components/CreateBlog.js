import { Button, Form, Input, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { useNavigate } from "react-router-dom";

import {
  useCreateBlogMutation,
  useUpdateBlogMutation,
} from "app/api/blogService";

function CreateBlog({ accessToken, blog, edit = false }) {
  const [form] = Form.useForm();
  const [create] = useCreateBlogMutation();
  const [update] = useUpdateBlogMutation();
  const contentValue = Form.useWatch("content", form);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = (values) => {
    setLoading(true);
    const formData = new FormData();
    if (values.image) {
      [...values.image].forEach((file, i) => {
        if (file?.originFileObj) {
          formData.append("image", file.originFileObj, file.name);
        } else formData.append("uploadedImage", file.id);
      });
    }
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("tag", values.tag);

    if (!edit) {
      create({
        data: formData,
        headers: {
          accessToken,
        },
      })
        .then((res) => {
          if (res.data?.error) {
            message.error(res.data.error);
          } else {
            message.success("Tạo thành công!");
            form.resetFields();
          }
          setLoading(false);
        })
        .catch((err) => {
          message.error("Tạo thất bại!");
          console.log(err);
          setLoading(false);
        });
    } else {
      update({
        data: formData,
        id: blog?.id,
        headers: {
          accessToken,
        },
      })
        .then((res) => {
          if (res.data?.error) {
            message.error(res.data.error);
          } else {
            message.success("Cập nhật thành công!");
            form.resetFields();
            navigate("/blogs");
          }
          setLoading(false);
        })
        .catch((err) => {
          message.error("Cập nhật thất bại!");
          console.log(err);
          setLoading(false);
        });
    }
  };
  return (
    <div>
      <div className='text-4xl font-bold'>Tạo bài viết</div>
      <Form form={form} onFinish={onFinish} initialValues={blog}>
        <div className='mt-6'>
          <div className='font-bold text-xl mb-4 last:mb-0'>
            <div className='mb-2'>Tiêu đề:</div>
            <Form.Item
              name='title'
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiêu đề!",
                },
              ]}
            >
              <Input size='large'></Input>
            </Form.Item>
          </div>

          <div className='font-bold text-xl mb-4 last:mb-0'>
            <div className='mb-2'>Tag:</div>
            <Form.Item name='tag' initialValue={""}>
              <Input size='middle'></Input>
            </Form.Item>
          </div>

          <div className='text-xl mb-4 last:mb-0'>
            <div className='mb-2 font-bold'>Nội dung:</div>
            <Form.Item
              name='content'
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập nội dung!",
                },
              ]}
            >
              <div>
                <EditorToolbar toolbarId={"t1"} />
                <ReactQuill
                  theme='snow'
                  className='h-32'
                  value={contentValue}
                  onChange={(value) => form.setFieldValue("content", value)}
                  placeholder={"Nội dung bài viết..."}
                  modules={modules("t1")}
                  formats={formats}
                />
              </div>
            </Form.Item>
          </div>

          <Form.Item name='image' initialValue={blog?.images}>
            <Upload
              onChange={({ fileList }) => {
                form.setFieldValue("image", fileList);
              }}
              accept='image/png, image/jpeg'
              listType='picture-card'
              beforeUpload={() => false}
              multiple
              defaultFileList={blog?.images.map((item) => ({
                ...item,
                uid: item.id.toString(),
              }))}
            >
              <button style={{ border: 0, background: "none" }} type='button'>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Đăng hình ảnh</div>
              </button>
            </Upload>
          </Form.Item>

          <Button
            type='primary'
            htmlType='submit'
            size='large'
            loading={loading}
          >
            {edit ? "Sửa bài viết" : "Tạo bài viết"}
          </Button>
          {edit && (
            <Button
              size='large'
              htmlType='button'
              className='ml-4'
              onClick={() => navigate("/blogs")}
            >
              Hủy
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default CreateBlog;
