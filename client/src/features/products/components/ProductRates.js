import React from "react";
import { Rate, Button, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";

import UserRate from "./UserRate";
import { useUpdateRateMutation } from "app/api/rateService";

function ProductRates({ productId, rates }) {
  const [update] = useUpdateRateMutation();
  const [form] = Form.useForm();
  const { accessToken, language } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    if (!accessToken) {
      message.error(
        language === "vi" ? "Bạn cần đăng nhập trước!" : "ログインしていません!"
      );
    }

    update({
      id: productId,
      data: {
        ...values,
      },
      headers: {
        accessToken,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          if (language === "vi") {
            message.error(res.data.error);
          } else
            message.error(
              language === "vi"
                ? "Lỗi kết nối server! Vui lòng thử lại sau."
                : "サーバー接続エラー！後でもう一度お試しください。"
            );
        } else {
          message.success(
            language === "vi"
              ? "Cảm ơn bạn đã đóng góp ý kiến"
              : "ご意見をいただきありがとうございます"
          );
          form.resetFields();
        }
      })
      .catch((err) => {
        message.error(
          language === "vi"
            ? "Lỗi kết nối server! Vui lòng thử lại sau."
            : "サーバー接続エラー！後でもう一度お試しください。"
        );
        console.log(err);
      });
  };
  return (
    <div className='text-lg p-4'>
      <div>
        {rates.length > 0 ? (
          rates?.map((item) => <UserRate key={item.id} rate={item}></UserRate>)
        ) : (
          <span>
            {language === "vi"
              ? "Chưa có đánh giá nào cho sản phẩm này"
              : "評価がない"}
          </span>
        )}
      </div>
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <div className='mt-4 text-lg '>
          <div className='flex items-center'>
            <span className='mr-4'>
              {language === "vi" ? "Đánh giá của bạn :" : "評価："}
            </span>
            <Form.Item name='rate' initialValue={5} className='mb-0'>
              <Rate className='text-3xl' />
            </Form.Item>
          </div>
          <Form.Item name='content'>
            <TextArea
              className='mt-4 p-2'
              rows={4}
              placeholder='Nội dung đánh giá'
            />
          </Form.Item>
          <Button
            className='mt-4'
            htmlType='submit'
            type='primary'
            size='large'
          >
            {language === "vi" ? "Gửi" : "出す"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProductRates;
