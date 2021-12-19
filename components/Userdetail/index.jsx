import React, { useEffect, useState } from "react";
import Router from "next/router";
import {
  Descriptions,
  Badge,
  Button,
  Modal,
  Form,
  Input,
  message,
  InputNumber,
  Table, Tag
} from "antd";
import { KeyOutlined, HistoryOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";

import DefaultLayout from "../../layouts/Default";
import apiService from "../../utils/api/apiService";
import moment from 'moment';
//import numberFormat from '../../../utils/modules/numberFormat';

import { userState } from "../../store/userState";
import { set } from "mongoose";
import numberFormat from '../../utils/modules/numberFormat';
export default function UserDetail() {
  const [user, setUser] = useRecoilState(userState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalPass, setIsModalPass] = useState(false);
  const [form] = Form.useForm();
  const key = "fetching";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUser(user);
    }
    getBills();
  }, []);

  useEffect(() => {
    if (isModalVisible) {
      form.setFieldsValue({
        ...user,
      });
    }
  }, [isModalVisible]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    try {
      message.loading({ content: "Đang cập nhật", key });

      const response = await apiService.post(`/users/update`, values);
      setUser({ ...user, ...values });
      //Destructuring
      message.success({ content: response.data.message, key });
      setIsModalVisible(false);
    } catch (error) {
      message.error({ content: "Có lỗi xảy ra", key });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //
  const showModalPass = () => {
    setIsModalPass(true);
  };

  const handleOkPass = async (values) => {
    try {
      message.loading({ content: "Đang cập nhật", key });

      const response = await apiService.post(`/users/update-password`, values);
      //   console(response);

      message.success({ content: response.data.message, key });
      // message.error({ content: response.data.message, key });
      setIsModalPass(false);
    } catch (error) {
      message.error({ content: "Mật khẩu cũ sai", key });
    }
  };

  const handleCancelPass = () => {
    setIsModalPass(false);
  };
  //
  const [isModalHistory, setIsModalHistory] = useState(false);

  const showModalHistory = () => {
    setIsModalHistory(true);
  };

  const handleCancelHistory = () => {
    setIsModalHistory(false);
  };
  //
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBills = async (id = user._id) => {
    try {
      setLoading(true);
      const response = await apiService.get(`/bills/findBillById`);

      setBills(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [

    {
      title: 'Phim',
      dataIndex: 'movieTitle',
      key: 'movieTitle',
    },
    {
      title: 'Rạp',
      dataIndex: 'cinemaName',
      key: 'cinemaName',
    },
    {
      title: 'Phòng',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'Thanh toán',
      dataIndex: 'checkoutDate',
      key: 'checkoutDate',
      render: date => <span>{moment(date).format("DD-MM-YYYY HH:ss")}</span>,
    },
    {
      title: 'Số vé',
      dataIndex: 'seat',
      key: 'seat',
      render: seat => <span>{seat.length}</span>
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (price, record) => <span>{numberFormat(price / record.seat.length)} đ</span>
  },
  {
      title: 'Tổng tiền',
      dataIndex: 'price',
      key: 'price',
      render: price => <span>{numberFormat(price)} đ</span>
  },

  ];

  return (
    <DefaultLayout>
      <div className="mx-20">
        <Descriptions
          title="Thông tin người dùng"
          bordered
          className="pt-16"
          extra={
            <Button type="primary" size="large" onClick={showModal}>
              Chỉnh sửa
            </Button>
          }
        >
          <Descriptions.Item label="Họ và tên" span={2}>
            {user.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Tuổi"> {user.age}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại" span={3}>
            {user.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Tên đăng nhập">
            {user.userName}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Badge status="processing" text="Running" />
          </Descriptions.Item>
        </Descriptions>
        <div className="mt-6 space-x-6 flex">
          <Button
            className=" bg-purple-600 text-white flex items-center"
            shape="round"
            icon={<KeyOutlined />}
            size="large"
            onClick={showModalPass}
          >
            Đổi mật khẩu
          </Button>
          <Button
            className=" bg-pink-600 text-white flex items-center"
            shape="round"
            icon={<HistoryOutlined />}
            size="large"
            onClick={showModalHistory}
          >
            Lịch sử đặt vé
          </Button>
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleOk(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="basic" autoComplete="off">
          <h1 className="text-center text-xl pb-4">Cập nhập thông tin</h1>
          <Form.Item
            label="Tên đăng nhập"
            name="userName"
            rules={[
              {
                required: true,
                message: "Tên đăng nhập không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tên đầy đủ"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Tên đầy đủ không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tuổi tác"
            name="age"
            rules={[
              {
                type: "number",
                required: true,
                message: "Tuổi trong khoảng 1-99!",
                min: 1,
                max: 99,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Số điện thoại có độ dài là 10 số!",
                len: 10,
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item className="text-center"></Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={isModalPass}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleOkPass(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        onCancel={handleCancelPass}
      >
        <Form form={form} layout="vertical" name="basic" autoComplete="off">
          <h1 className="text-center text-xl pb-4">Cập nhập mật khẩu</h1>
          <Form.Item
            label="Mật khẩu cũ"
            name="password_current"
            rules={[
              {
                required: true,
                message:
                  "Mật khẩu cũ không được để trống và độ dài trên 6 kí tự!",
                min: 6,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[
              {
                required: true,
                message:
                  "Mật khẩu mới không được để trống và độ dài trên 6 kí tự!",
                min: 6,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Lịch sử đặt vé" visible={isModalHistory} onCancel={handleCancelHistory} footer={null} width={1000}>

        <Table loading={loading} columns={columns} dataSource={bills} />

      </Modal>
    </DefaultLayout>
  );
}
