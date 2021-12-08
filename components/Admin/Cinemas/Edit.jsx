import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const AdminCinemaEdit = ({ showModal, setShowModal, cinemaDetail, updateCinemas }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (showModal) {
      form.setFieldsValue({
        ...cinemaDetail,
      });
    }
  }, [showModal]);

  const handleUpdate = () => {
    form.validateFields()
      .then(values => {
        updateCinemas(cinemaDetail._id, values)
      })
  }
  return (
    <>
      <Modal
        title="Chỉnh sửa phòng chiếu"
        visible={showModal}
        onOk={handleUpdate}
        onCancel={() => setShowModal(false)}
      >
        <Form form={form} layout="vertical" className=" mx-auto">
          <Form.Item
            label="Tên rạp"
            name="cinemaName"
            rules={[
              { required: true, message: "Tên rạp không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ rạp"
            name="cinemaAddress"
            rules={[
              { required: true, message: "Địa chỉ rạp không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Loại rạp"
            name="cinemaType"
            rules={[
              { required: true, message: "Loại rạp không được để trống!" },
            ]}
          >
            <Select placeholder="Chọn loại rạp">
              <Option value="Galaxy">Galaxy</Option>
              <Option value="Lotte">Lotte</Option>
              <Option value="CGV">CGV</Option>
              <Option value="CineStar">CineStar</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Đường dẫn hình ảnh rạp"
            name="imgUrl"
            rules={[
              {
                required: true,
                message: "Đường dẫn hình ảnh rạp không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default AdminCinemaEdit;
