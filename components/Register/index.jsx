import React, { useEffect } from 'react'
import Router from 'next/router'
import { Form, Input, Button, message,InputNumber } from 'antd';
import { useRecoilState } from 'recoil';

import DefaultLayout from '../../layouts/Default'
import apiService from '../../utils/api/apiService';
import { userState } from '../../store/userState';

export default function Register() {

    const [user] = useRecoilState(userState);

    const handleRegister = async (values) => {
        const key = "/";
        try {
            message.loading({ content: "Đang đăng kí", key })
            await apiService.post('/users', values);
            message.success({ content: "Đăng kí thành công", key })
        } catch (error) {
            message.error({ content: error.response.data.message, key })
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };




    return (
       
        <DefaultLayout>
            <Form 
                layout="vertical"
                className="w-1/3 transform fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-10 py-8 my-5 border-2 shadow-md"
                name="basic"
                onFinish={handleRegister}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                 <h1 className="text-center text-xl pb-4">Đăng kí</h1>
                <Form.Item
                    label="Tên đăng nhập"
                    name="userName"
                    rules={[
                        {
                            required: true,
                            message: 'Tên đăng nhập không được để trống!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Mật khẩu không được để trống và độ dài trên 6 kí tự!',
                            min:6,
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Tên đầy đủ"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Tên đầy đủ không được để trống!',
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
                                message: 'Tuổi trong khoảng 1-99!',
                                min: 1, max: 99,
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
                            message: 'Số điện thoại có độ dài là 10 số!',
                            len:10,
                        },
                    ]}
                >
                    <Input type="number"/>
                </Form.Item>

                <Form.Item
                    className="text-center"
                >
                    <Button type="primary" htmlType="submit">
                        Đăng kí
                    </Button>
                </Form.Item>
            </Form>
        </DefaultLayout>
    )
}
