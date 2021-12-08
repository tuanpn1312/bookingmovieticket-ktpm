import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Radio, Button, Select, message } from 'antd'

import apiService from '../../../utils/api/apiService';

const { Option } = Select;

const AdminCinemaAdd = () => {

    const key = 'fetching';
    const onAddMovie = async (values) => {
        try {
            message.loading({ content: "Đang cập nhật", key });
            await apiService.post(`/cinemas`, { ...values, status: true });
            message.success({ content: `Đã thêm rạp ${values.cinemaName}`, key });
        } catch (error) {
            message.error({ content: "Có lỗi xảy ra", key })
        }
    }

    return (
        <>
            <Form
                onFinish={onAddMovie}
                layout='vertical' className="w-4/12 mx-auto">
                <Form.Item
                    label="Tên rạp"
                    name="cinemaName"
                    rules={[{ required: true, message: "Tên rạp không được để trống!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ rạp"
                    name="cinemaAddress"
                    rules={[{ required: true, message: "Địa chỉ rạp không được để trống!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Loại rạp"
                    name="cinemaType"
                    rules={[{ required: true, message: "Loại rạp không được để trống!" }]}
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
                    rules={[{ required: true, message: "Đường dẫn hình ảnh rạp không được để trống!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item className="text-center"
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Thêm rạp
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default AdminCinemaAdd;