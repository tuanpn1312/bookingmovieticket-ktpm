import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import { Table, Tag, Space, Popconfirm, message } from 'antd';

import apiService from '../../../utils/api/apiService';


export default function AdminUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUser = async () => {
        try {
            setLoading(true);
            const response = await apiService.get('/users/danhsach');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const updateStatusUser = async (id, status) => {
        try {
            setLoading(true);
            const response = await apiService.post('/users/userstatus', {
                id, status
            })
            message.success(response.data.message, 2);
            getUser();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
        {
            title: 'Tên đăng nhập',
            dataIndex: 'userName',
            key: 'userName',
            // render: text => <a>{text}</a>,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName',
            // render: text => <a>{text}</a>,
        },
        {
            title: 'Tuổi',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: status => (
                <>
                    <Tag color={status ? 'green' : 'volcano'}>
                        {status ? "Hoạt động" : "Tạm khóa"}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {/* <a>Invite {record.name}</a> */}
                    <Popconfirm
                        title={record.status ? `Tài khoản "${record.userName}" sẽ không thể đăng nhập. Khóa người dùng?`
                            : `Tài khoản "${record.userName}" sẽ được mở khóa?`}
                        onConfirm={() => updateStatusUser(record._id, !record.status)}
                        okText={record.status ? "Khóa" : "Mở khóa"}
                        cancelText="Hủy"
                    >
                        <a className={classNames('', {
                            "hover:text-red-400": record.status,
                            "hover:text-green-400": !record.status
                        })}>{record.status ? 'Khóa' : "Mở khóa"}</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getUser();
    }, [])
    return (
        <div>
            <Table loading={loading} columns={columns} dataSource={users} />
        </div>
    )
}
