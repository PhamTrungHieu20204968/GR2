import React, { useState } from "react";
import {
  Row,
  Col,
  Table,
  Image,
  InputNumber,
  message,
  Button,
  Input,
} from "antd";
import { useDispatch } from "react-redux";
import {
  CloseCircleOutlined,
  ArrowLeftOutlined,
  CheckOutlined,
  TagFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import { updateCart, deleteItem, addToCart } from "app/slices/cartSlice";

function Cart({ cart }) {
  const [cartData, setCartData] = useState(cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deletedItem, setDeletedItem] = useState();
  const [notify, setNotify] = useState();
  const [flag, setFlag] = useState(false);
  const totalCost = cart.reduce((total, item) => {
    return total + parseInt(item.price) * item.orderQuantity;
  }, 0);

  const handleChangeQuantity = (value, record) => {
    if (value >= 1 && value <= 99) {
      const newData = cartData.map((item) => {
        if (item.id === record.id) {
          return { ...item, orderQuantity: value };
        }
        return item;
      });
      setCartData(newData);
      setFlag(true);
    } else {
      message.error("Giá trị không hợp lệ!");
      setFlag(false);
    }
  };

  const handleDeleteItem = (product) => {
    const newData = cart.filter((item) => {
      if (item.id === product.id) {
        setDeletedItem(item);
      }
      return item.id !== product.id;
    });
    setCartData(newData);
    dispatch(deleteItem(product.id));
    setNotify({ status: "delete", message: ` "${product.name}" đã xóa.` });
  };

  const handleReverseDelete = () => {
    setCartData((prev) => [...prev, deletedItem]);
    dispatch(addToCart(deletedItem));
    setNotify();
  };

  const handleUpdateCart = () => {
    dispatch(updateCart(cartData));
    setNotify({ status: "update", message: "Đã cập nhật giỏ hàng" });
  };

  const columns = [
    {
      title: "SẢN PHẨM",
      dataIndex: "product",
      key: "product",
      render: (_, record) => (
        <div className='w-full flex items-center gap-2 overflow-hidden'>
          <CloseCircleOutlined
            className='text-xl text-gray-300 hover:text-black cursor-pointer'
            onClick={() => handleDeleteItem(record)}
          />
          <Image
            width={80}
            className='product-img'
            src={record?.images[0]?.url}
            fallback='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=='
          />
          <Link
            to={`/products/${
              record.categoryId === 1
                ? "foods"
                : record.categoryId === 2
                ? "accessories"
                : "pets"
            }/${record.name}`}
            className='hover:text-pink-400 cursor-pointer'
          >
            {record.name}
          </Link>
        </div>
      ),
    },
    {
      title: "GIÁ",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <b>
          {parseInt(text).toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </b>
      ),
    },
    {
      title: "SỐ LƯỢNG",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <InputNumber
          defaultValue={record.orderQuantity}
          className='w-14'
          min={1}
          max={99}
          onChange={(value) => handleChangeQuantity(value, record)}
        ></InputNumber>
      ),
    },
    {
      title: "TỔNG CỘNG",
      dataIndex: "total",
      key: "total",
      render: (_, record) => (
        <b className=''>
          {(parseInt(record.price) * record.quantity).toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </b>
      ),
    },
  ];

  return (
    <Row gutter={16}>
      <Col span={14} className='border-r-2'>
        <p>
          {notify?.message && (
            <span className='text-green-500 text-base font-semibold flex gap-2'>
              <CheckOutlined />
              {notify.message}
              {notify?.status === "delete" && (
                <span
                  className='text-black font-normal cursor-pointer hover:text-pink-500'
                  onClick={handleReverseDelete}
                >
                  Khôi phục?
                </span>
              )}
            </span>
          )}
        </p>
        <Table dataSource={cartData} columns={columns} pagination={false} />
        <div className='flex'>
          <Button
            className='mt-4 text-sm font-semibold text-primary mr-4 flex items-center'
            size='large'
            type='default'
            onClick={() => navigate("/")}
          >
            <ArrowLeftOutlined />
            TIẾP TỤC XEM SẢN PHẨM
          </Button>
          <Button
            className='mt-4 text-sm font-semibold'
            size='large'
            type='primary'
            disabled={!flag}
            onClick={() => handleUpdateCart()}
          >
            CẬP NHẬT GIỎ HÀNG
          </Button>
        </div>
      </Col>
      <Col span={10}>
        <div className='font-semibold text-base pb-1 w-full border-b-2'>
          TỔNG SỐ LƯỢNG
        </div>
        <div className='mt-4 text-base flex justify-between pb-1 border-b-[1px]'>
          <div className=''>Tổng cộng</div>
          <b>
            {totalCost.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </b>
        </div>
        <div className='py-2 text-base flex justify-between border-b-[1px]'>
          <div className=''>Mã ưu đãi</div>
          <span>Không</span>
        </div>
        <div className='mt-4 text-base flex justify-between pb-1 border-b-[1px]'>
          <div className=''>Tổng cộng</div>
          <b>
            {totalCost.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </b>
        </div>

        <button
          onClick={() => navigate("/pay")}
          className='text-white bg-pink-500 w-full h-10 text-lg font-semibold mt-4 hover:text-white hover:bg-pink-600'
        >
          TIẾN HÀNH THANH TOÁN
        </button>

        <div className='mt-6 font-semibold text-base pb-1 flex gap-2 w-full border-b-2'>
          <TagFilled />
          Mã ưu đãi
        </div>
        <Input
          size='middle'
          placeholder='Mã ưu đãi'
          className='my-4 rounded-none text-base'
        ></Input>

        <button className='text-black bg-gray-100 w-full h-10 text-base hover:text-black hover:bg-gray-300'>
          Áp dụng
        </button>
      </Col>
    </Row>
  );
}

export default Cart;
