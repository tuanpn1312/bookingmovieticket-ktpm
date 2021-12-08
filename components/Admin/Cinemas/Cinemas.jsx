import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import moment from 'moment';
import { Table, Tag, Space, Popconfirm, message } from 'antd';

import apiService from '../../../utils/api/apiService';
import AdminCinemaEdit from './Edit';

export default function AdminCinemas() {
    const [cinemas, setCinemas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [cinemaDetail, setCinemaDetails] = useState({});
    const key = 'fetching';

    const getCinemas = async () => {
        try {
            const response = await apiService.get('/cinemas/getAllCinemas');
            setCinemas(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateCinemaStatus = (record, status) => {
        updateCinemas(record._id, { ...record, status })
    }

    const updateCinemas = async (id, values) => {
        try {
            message.loading({ content: "Đang cập nhật", key })
            await apiService.put(`/cinemas/${id}`, values);
            getCinemas();
            message.success({ content: "Cập nhật thành công", key });
            setShowModal(false);
        } catch (error) {
            message.error({ content: "Có lỗi xảy ra", key });
        }
    }

    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            render: img => <div className="flex items-center">
                <img width={120} src={img} alt="ảnh rạp" />
            </div>,
        },
        {
            title: 'Tên rạp',
            dataIndex: 'cinemaName',
            key: 'cinemaName',
            render: (text, record) => <a className="cursor-pointer hover:underline"
                onClick={() => {
                    setShowModal(true)
                    setCinemaDetails(record)
                }}
            >
                {text}</a>,
        },
        {
            title: 'Loại',
            dataIndex: 'cinemaType',
            key: 'cinemaType',
            // render: text => <a>{text}</a>,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'cinemaAddress',
            key: 'cinemaAddress',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: status => (
                <>
                    <Tag color={status ? 'green' : 'volcano'}>
                        {status ? "Hoạt động" : "Tạm ngừng"}
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
                        title={record.status ? `Rạp "${record.cinemaName}" sẽ không hiển thị cho người dùng. Tạm dừng hoạt động?`
                            : `Rạp "${record.cinemaName}" sẽ được mở cửa?`}
                        onConfirm={() => updateCinemaStatus(record, !record.status)}
                        okText={record.status ? "Tạm dừng" : "Hoạt động"}
                        cancelText="Hủy"
                    >
                        <a className={classNames('', {
                            "hover:text-red-400": record.status,
                            "hover:text-green-400": !record.status
                        })}>{record.status ? 'Tạm dừng' : "Hoạt động"}</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getCinemas();
    }, [])
    return (
        <div>
            <Table
                columns={columns} dataSource={cinemas}
                pagination={{ defaultPageSize: 6 }}
                scroll={{ y: 500 }} />
            <AdminCinemaEdit showModal={showModal} setShowModal={setShowModal} cinemaDetail={cinemaDetail} updateCinemas={updateCinemas} />
        </div>
    )
}
