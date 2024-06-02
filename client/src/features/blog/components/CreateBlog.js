import { Button, Form, Input, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  useCreateBlogMutation,
  useUpdateBlogMutation,
} from "app/api/blogService";

function CreateBlog({ accessToken, blog, edit = false }) {
  const { language } = useSelector((state) => state.auth);
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
            message.error(
              language === "vi" ? "Tạo thất bại" : "作成に失敗しました"
            );
          } else {
            message.success(
              language === "vi" ? "Tạo thành công" : "作成に成功しました"
            );
            form.resetFields();
          }
          setLoading(false);
        })
        .catch((err) => {
          message.error(
            language === "vi" ? "Tạo thất bại" : "作成に失敗しました"
          );
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
            message.error(
              language === "vi" ? "Cập nhật thất bại" : "修正に失敗しました"
            );
          } else {
             message.success(
              language === "vi" ? "Cập nhật thành công" : "修正に成功しました"
            );
            form.resetFields();
            navigate("/blogs");
          }
          setLoading(false);
        })
        .catch((err) => {
          message.error(
            language === "vi" ? "Cập nhật thất bại" : "修正に失敗しました"
          );
          console.log(err);
          setLoading(false);
        });
    }
  };
  return (
    <div>
      <div className='text-4xl font-bold'>
        {language === "vi" ? "Tạo bài viết" : "ブログを作る"}
      </div>
      <Form form={form} onFinish={onFinish} initialValues={blog}>
        <div className='mt-6'>
          <div className='font-bold text-xl mb-4 last:mb-0'>
            <div className='mb-2'>
              {language === "vi" ? "Tiêu đề:" : "タイトル："}
            </div>
            <Form.Item
              name='title'
              rules={[
                {
                  required: true,
                  message:
                    language === "vi"
                      ? "Vui lòng nhập tiêu đề!"
                      : "タイトルを入力しなければならない！",
                },
              ]}
            >
              <Input size='large'></Input>
            </Form.Item>
          </div>

          <div className='font-bold text-xl mb-4 last:mb-0'>
            <div className='mb-2'>{language === "vi" ? "Tag:" : "タグ："}</div>
            <Form.Item name='tag' initialValue={""}>
              <Input size='middle'></Input>
            </Form.Item>
          </div>

          <div className='text-xl mb-4 last:mb-0'>
            <div className='mb-2 font-bold'>
              {language === "vi" ? "Nội dung:" : "内容："}
            </div>
            <Form.Item
              name='content'
              rules={[
                {
                  required: true,
                  message:
                    language === "vi"
                      ? "Vui lòng nhập nội dung!"
                      : "内容を入力しなければならない！",
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
                  placeholder={
                    language === "vi" ? "Nội dung bài viết..." : "ブログの内容"
                  }
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
                <div style={{ marginTop: 8 }}>
                  {language === "vi" ? "Đăng hình ảnh" : "写真をつく"}
                </div>
              </button>
            </Upload>
          </Form.Item>

          <Button
            type='primary'
            htmlType='submit'
            size='large'
            loading={loading}
          >
            {edit
              ? language === "vi"
                ? "Sửa bài viết"
                : "編集する"
              : language === "vi"
              ? "Tạo bài viết"
              : "作る"}
          </Button>
          {edit && (
            <Button
              size='large'
              htmlType='button'
              className='ml-4'
              onClick={() => navigate("/blogs")}
            >
              {language === "vi" ? "Hủy" : "キャンセル"}
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default CreateBlog;
