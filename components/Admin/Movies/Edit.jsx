import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Radio, message } from 'antd'
import moment from 'moment'
import apiService from '../../../utils/api/apiService';

const AdminMovieEdit = ({
    showModal,
    setShowModal,
    movieDetail,
    updateMovie
}) => {
    const [form] = Form.useForm()

    const handleUpdate = () => {
        const key = 'updating';

        form.validateFields()
            .then(values => {
                updateMovie(movieDetail._id, values)
            })
            .catch(e => message.error({ content: 'Có lỗi xảy ra', key }))
    }

    useEffect(() => {
        if (showModal) {
            form.setFieldsValue({
                ...movieDetail,
                startDate: movieDetail.startDate ? moment(movieDetail.startDate) : '',
            });
        }
    }, [showModal])

    return (
        <>
            <Modal
                title="Chỉnh sửa phim"
                visible={showModal}
                onOk={handleUpdate}
                onCancel={() => setShowModal(false)}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item
                        label="Tên phim"
                        name="title"
                        rules={[{ required: true, message: "Tên phim không được để trống!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Thể loại"
                        name="category"
                        rules={[{ required: true, message: "Thể loại không được để trống!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ngày công chiếu"
                        name="startDate"
                        rules={[{ required: true, message: "Ngày công chiếu không được để trống!" }]}
                    >
                        <DatePicker placeholder="Chọn ngày" format='DD/MM/YYYY' />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả phim"
                        name="description"
                        rules={[{ required: true, message: "Mô tả phim không được để trống!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Thời lượng phim"
                        name="movieDuration"
                        rules={[{ required: true, message: "Thời lượng phim không được để trống!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Định dạng phim"
                        name="movieFormat"
                        rules={[{ required: true, message: "Định dạng phim không được để trống!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Trailer URL"
                        name="trailerUrl"
                        rules={[{ required: true, message: "Trailer URL không được để trống!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Quốc gia"
                        name="national"
                        rules={[{ required: true, message: "Quốc gia không được để trống!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Đạo diễn"
                        name="direction"
                        rules={[{ required: true, message: "Đạo diễn không được để trống!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Diễn viên"
                        name="cast"
                        rules={[{ required: true, message: "Diễn viên không được để trống!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh phim"
                        name="movieImg"
                        rules={[{ required: true, message: "Ảnh phim không được để trống!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Banner"
                        name="bannerImg"
                        rules={[{ required: true, message: "Banner không được để trống!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái công chiếu"
                        name="status"
                        rules={[{ required: true, message: "Trạng thái công chiếu không được để trống!" }]}
                    >
                        <Radio.Group>
                            <Radio value="now showing">Đang chiếu</Radio>
                            <Radio value="coming soon">Sắp chiếu</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default AdminMovieEdit;