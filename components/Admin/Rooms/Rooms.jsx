import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import moment from 'moment';
import { Table, Tag, Space, Popconfirm, message, Row } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";

import apiService from '../../../utils/api/apiService';
import AdminRoomEdit from './Edit';

export default function AdminRooms() {
    const [rooms, setRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [roomDetail, setRoomDetails] = useState({});

    const key = 'fetching';
    const getRooms = async () => {
        try {
            const response = await apiService.get('/rooms');
            const responseListCinemas = await apiService.get('/cinemas/getAllCinemas');
            const listRooms = response.data.map((room) => {
                const cinema = responseListCinemas.data.find(cinema => room.cinemas === cinema._id);
                return { ...cinema, ...room };
            })
            setRooms(listRooms);
        } catch (error) {
            console.log(error);
        }
    }

    const updateRooms = async (id, values, type = 'update') => {
        try {
            message.loading({ content: "Đang cập nhật", key })
            if (type === 'delete') {
                await apiService.delete(`/rooms/${id}`);
            } else {
                await apiService.put(`/rooms/${id}`, values);
            }
            getRooms();
            message.success({ content: "Cập nhật thành công", key });
            setShowModal(false);
        } catch (error) {
            message.error({ content: "Có lỗi xảy ra", key });
        }
    }

    const updateRoomStatus = async (room, status) => {
        updateRooms(room._id, { ...room, status }, !status ? 'delete' : 'update');
    }


    const columns = [
        {
            title: 'Tên phòng',
            dataIndex: 'nameRoom',
            key: 'nameRoom',
            render: (text, record) => <a className="flex items-center cursor-pointer hover:underline"
                onClick={() => {
                    setShowModal(true)
                    setRoomDetails(record)
                }}
            >
                {text}</a>,
        },
        {
            title: 'Loại',
            dataIndex: 'typeRoom',
            key: 'typeRoom',
            // render: text => <a>{text}</a>,
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
            title: 'Tên rạp',
            dataIndex: 'cinemaName',
            key: 'cinemaName',
            // render: text => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {/* <a>Invite {record.name}</a> */}
                    <Popconfirm
                        title={record.status ? `Phòng "${record.nameRoom}" sẽ dừng hoạt động?`
                            : `Phòng "${record.nameRoom}" sẽ được mở hoạt động?`}
                        onConfirm={() => updateRoomStatus(record, !record.status)}
                        okText={record.status ? "Dừng hoạt động" : "Mở hoạt động"}
                        cancelText="Hủy"
                    >
                        <a className={classNames('', {
                            "hover:text-red-400": record.status,
                            "hover:text-green-400": !record.status
                        })}>{record.status ? 'Dừng hoạt động' : "Mở hoạt động"}</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getRooms();
    }, [])
    return (
        <div>
            <Table
                columns={columns} dataSource={rooms}
                pagination={{ defaultPageSize: 6 }}
                scroll={{ y: 500 }} />
            <AdminRoomEdit showModal={showModal} setShowModal={setShowModal} roomDetail={roomDetail} updateRooms={updateRooms} />
        </div>
    )
}