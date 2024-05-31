import React, { useState } from "react";
import { Button, Col, Popconfirm, Row, Select, message } from "antd";
import { useSelector } from "react-redux";

import Sidebar from "../components/Sidebar";
import { Space, Table, Tag, Input, Result, Spin } from "antd";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "app/api/userService";
import Form from "antd/es/form/Form";

const { Search } = Input;

const ListUser = () => {
  const [searchValue, setSearchValue] = useState("");
  const { accessToken } = useSelector((state) => state.auth);
  const { data, isError, isLoading } = useGetAllUserQuery({
    accessToken,
  });

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  if (isLoading) {
    <Spin />;
  }
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const handleDeleteUser = (id) => {
    deleteUser({
      id,
      headers: {
        accessToken,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          message.error(res.data?.error);
        } else {
          if (data?.error) {
            message.error(data?.error);
          } else message.success("Xóa thành công!");
        }
      })
      .catch((err) => {
        message.error("Xóa thất bại!");
        console.log(err);
      });
  };
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      point: data?.point,
      rank: data?.rank,
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      updateUser({
        data: { ...row },
        id,
        headers: {
          accessToken: accessToken,
        },
      })
        .then((res) => {
          if (res.data?.error) {
            message.error(res.data.error);
          } else {
            message.success("Lưu thay đổi thành công!");
          }
        })
        .catch((err) => {
          message.error("Lưu thay đổi thất bại!");
          console.log(err);
        });
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <Tag color={status === 1 ? "green" : "default"}>
          {status === 1 ? "Hoạt động" : "Ngoại tuyến"}
        </Tag>
      ),
      filters: [
        {
          text: "Hoạt động",
          value: 1,
        },
        {
          text: "Ngoại tuyến",
          value: 0,
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Số đơn hàng",
      key: "orders",
      render: (_, record) => record.orders || 0,
      sorter: (a, b) => a.orders - b.orders,
    },
    {
      title: "rank",
      key: "rank",
      render: (_, record) =>
        record.rank === 0 ? "Silver" : record.rank === 1 ? "Gold" : "Platinum",

      sorter: (a, b) => a.rank - b.rank,
      editable: true,
    },
    {
      title: "Điểm",
      key: "point",
      render: (_, record) => record.point || 0,
      sorter: (a, b) => a.comments - b.comments,
      editable: true,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <Space size='middle'>
            {editable ? (
              <span>
                <Button
                  type='primary'
                  onClick={() => save(record.id)}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </Button>
                <Button onClick={() => cancel()}>Cancel</Button>
              </span>
            ) : (
              <Button type='primary' onClick={() => edit(record)}>
                Sửa
              </Button>
            )}
            <Popconfirm
              title='Xóa'
              description='Bạn chắc chắn xóa người dùng này?'
              onConfirm={() => handleDeleteUser(record.id)}
              okText='Có'
              cancelText='Không'
            >
              <Button type='primary' danger>
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.key === "rank" ? "select" : "text",
        dataIndex: col.key,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    let inputNode;
    switch (inputType) {
      case "select":
        inputNode = (
          <Select
            options={[
              {
                value: 0,
                label: "Silver",
              },

              {
                value: 1,
                label: "Gold",
              },
              {
                value: 2,
                label: "platinum",
              },
            ]}
          />
        );
        break;

      default:
        inputNode = <Input />;
        break;
    }
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Vui lòng nhập ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <div className='w-full h-screen overflow-hidden'>
      <Row gutter={16} className='pr-4'>
        <Col span={6}>
          <Sidebar></Sidebar>
        </Col>
        <Col span={18}>
          {isError || data?.error ? (
            <Result
              status='500'
              title='500'
              subTitle='Không thể kết nối đến Server.'
            />
          ) : (
            <div>
              <Row className='my-8' justify={"space-between"}>
                <Col>
                  <h1 className='text-3xl font-bold'>Danh sách người dùng</h1>
                </Col>
                <Col>
                  <Search
                    placeholder='Tìm kiếm'
                    allowClear
                    value={searchValue}
                    onChange={handleSearch}
                  />
                </Col>
              </Row>
              <Form form={form} component={false}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  columns={mergedColumns}
                  rowClassName='editable-row'
                  dataSource={data
                    ?.map((item) => ({ ...item, key: item.id }))
                    .filter((item) =>
                      item.name
                        .toUpperCase()
                        .includes(searchValue.toUpperCase())
                    )}
                />
              </Form>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ListUser;
