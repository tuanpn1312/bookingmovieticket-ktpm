import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd'
import moment from 'moment'
import apiService from '../../../utils/api/apiService';

const { Option } = Select;

const AdminRoomEdit = ({
    showModal,
    setShowModal,
    roomDetail,
    updateRooms,
}) => {
    const [form] = Form.useForm()

    const [cinemas, setCinemas] = useState([]);

    const getCinemas = async () => {
        try {
            const response = await apiService.get('/cinemas/getAllCinemas');
            setCinemas(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (showModal) {
            form.setFieldsValue({
                ...roomDetail
            });
        }
    }, [showModal])

    const handleUpdate = () => {
        form.validateFields()
            .then(values => {
                updateRooms(roomDetail._id, values);
            })
    }

    useEffect(() => {
        getCinemas();
    }, [])
    return (
        <>
            <Modal
                title="Chỉnh sửa phòng chiếu"
                visible={showModal}
                onOk={handleUpdate}
                onCancel={() => setShowModal(false)}
            >
                <Form form={form} layout='vertical' className="mx-auto">
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
                        name="cinemas"
                        rules={[{ required: true, message: "Rạp không được để trống!" }]}
                    >
                        <Select placeholder="Chọn rạp">
                            {cinemas.map((item) =>
                                <Option key={item._id} value={item._id}>{item.cinemaName}</Option>
                            )}
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
}

export default AdminRoomEdit;