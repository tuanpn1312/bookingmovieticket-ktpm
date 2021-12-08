import React, { useEffect } from 'react'
import Router from 'next/router'
import { Form, Input, Button, message } from 'antd';
import { useRecoilState } from 'recoil';

import DefaultLayout from '../../layouts/Default'
import apiService from '../../utils/api/apiService';
import { userState } from '../../store/userState';

export default function Login() {

    const [user, setUser] = useRecoilState(userState);

    const handleLogin = async (values) => {
        const key = "login";
        try {
            message.loading({ content: "Đang đăng nhập", key })
            await apiService.post('/users/login', values);
            const response = await apiService.get('/users/me');
            setUser(response.data);
            message.success({ content: "Đăng nhập thành công", key })
        } catch (error) {
            message.error({ content: error.response.data.message, key })
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (user._id && user.role === "member") {
            Router.push('/')
        } else if (user._id && user.role === "admin") {
            Router.push('/admin')
        }
    }, [user])


    return (

        <DefaultLayout>
            <Form
                layout="vertical"
                className="w-1/3 transform fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-10 py-8 border-2 shadow-md"
                name="basic"
                onFinish={handleLogin}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h1 className="text-center text-xl pb-4">Đăng nhập</h1>
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
                            message: 'Mật khẩu không được để trống!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    className="text-center"
                >
                    <Button type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </DefaultLayout>
    )
}
