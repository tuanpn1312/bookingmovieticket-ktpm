import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Radio, Button, Select, message } from 'antd'

import apiService from '../../../utils/api/apiService';

const { Option } = Select;

const AdminRoomAdd = () => {
    const [cinemas, setCinemas] = useState([]);

    const key = 'fetching';
    const onAddRoom = async (values) => {
        try {
            message.loading({ content: "Đang cập nhật", key });
            await apiService.post(`/rooms`, { ...values, status: true });
            message.success({ content: `Đã thêm phòng ${values.nameRoom}`, key });
        } catch (error) {
            message.error({ content: "Có lỗi xảy ra", key })
        }
    }

    const getCinemas = async () => {
        try {
            const response = await apiService.get('/cinemas/getAllCinemas');
            setCinemas(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCinemas();
    }, [])
    return (
        <>
            <Form
                onFinish={onAddRoom}
                layout='vertical' className="w-4/12 mx-auto">
                <Form.Item
                    label="Tên phòng chiếu"
                    name="nameRoom"
                    rules={[{ required: true, message: "Tên phòng chiếu không được để trống!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Loại phòng"
                    name="typeRoom"
                    rules={[{ required: true, message: "Loại phòng không được để trống!" }]}
                >
                    <Select placeholder="Chọn loại phòng">
                        <Option value="3D/Digitals">3D/Digitals</Option>
                        <Option value="2D/Digitals">2D/Digitals</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Rạp"
                    name="cinemaId"
                    rules={[{ required: true, message: "Rạp không được để trống!" }]}
                >
                    <Select placeholder="Chọn rạp">
                        {cinemas.map((item) =>
                            <Option key={item._id} value={item._id}>{item.cinemaName}</Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item className="text-center"
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Thêm phòng chiếu
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default AdminRoomAdd;