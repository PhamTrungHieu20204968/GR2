import { Button, Form, Input, message } from "antd";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";

import { useCreateBlogMutation } from "app/api/blogService";

function CreateBlog({ accessToken }) {
  const [form] = Form.useForm();
  const [create] = useCreateBlogMutation();
  const contentValue = Form.useWatch("content", form);
  const onFinish = (values) => {
    create({
      data: {
        ...values,
      },
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
      })
      .catch((err) => {
        message.error("Tạo thất bại!");
        console.log(err);
      });
  };

  return (
    <div>
      <div className='text-4xl font-bold'>Tạo bài viết</div>
      <Form form={form} onFinish={onFinish}>
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
            </Form.Item>
          </div>

          <Button type='primary' htmlType='submit' size='large'>
            Tạo bài viết
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateBlog;
