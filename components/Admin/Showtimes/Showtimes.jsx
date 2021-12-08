import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import moment from 'moment';
import { Table, Tag, Space, Popconfirm, message } from 'antd';

import numberFormat from '../../../utils/modules/numberFormat';
import apiService from '../../../utils/api/apiService';
import AdminShowtimeEdit from './Edit';

export default function AdminShowtimes() {
    const [showtimes, setShowtimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showtimeDetail, setShowtimeDetails] = useState({});

    const key = 'fetching';

    const getShowtimes = async () => {
        try {
            setLoading(true);
            const response = await apiService.get('/showtimes');

            const showtimesData = response.data.map((showtime) => {
                return {
                    ...showtime.cinemas[0], ...showtime.movies[0], ...showtime.rooms[0], ...showtime,
                    cinemas: showtime.cinemas[0]?._id, movies: showtime.movies[0]?._id, rooms: showtime.rooms[0]?._id,
                };
            })
            console.log(showtimesData);
            setShowtimes(showtimesData);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const updateShowtime = async (id, values, type = 'update') => {
        try {
            message.loading({ content: "Đang cập nhật", key })
            if (type === 'delete') {
                await apiService.delete(`/showtimes/${id}`);
            } else {
                await apiService.put(`/showtimes/${id}`, values);
            }
            getShowtimes();
            message.success({ content: "Cập nhật thành công", key });
        } catch (error) {
            message.error({ content: "Có lỗi xảy ra", key });
        }
    }

    const columns = [
        {
            title: 'Phim',
            dataIndex: 'movieImg',
            key: 'movieImg',
            render: img => <div className="flex items-center">
                <img width={120} src={img} alt="Phim rạp" />
            </div>,
        },
        {
            title: 'Rạp',
            dataIndex: 'cinemaName',
            key: 'cinemaName',
            // render: text => <a>{text}</a>,
        },
        {
            title: 'Phòng',
            dataIndex: 'nameRoom',
            key: 'nameRoom',
        },
        {
            title: 'Giá vé',
            dataIndex: 'price',
            key: 'price',
            render: price => <span>{numberFormat(price)} đồng</span>,
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
            render: date => <span>{moment(date).format("HH:mm DD-MM-YYYY")}</span>,
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
            render: date => <span>{moment(date).format("HH:mm DD-MM-YYYY")}</span>,
        },
        {
            title: 'Trạng thái',
            key: 'seats',
            dataIndex: 'seats',
            render: (seats, record) => {
                const bookedSeats = seats.filter(seat => seat.status);
                return (
                    <>
                        <Tag color={(bookedSeats.length - seats.length) === 0 ? 'volcano' : 'green'}>
                            {bookedSeats.length}/{seats.length}
                        </Tag>
                        <Tag color={record.status ? 'green' : 'volcano'}>
                            {record.status ? "Hoạt động" : "Tạm ngừng"}
                        </Tag>
                    </>
                )
            },
        },
    ];

    useEffect(() => {
        getShowtimes();
    }, [])
    return (
        <div>
            <Table
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => {
                            setShowModal(true)
                            setShowtimeDetails(record)
                        }
                    }
                }
                }
                loading={loading}
                columns={columns} dataSource={showtimes}
                pagination={{ defaultPageSize: 6 }}
                scroll={{ y: 500 }} />
            <AdminShowtimeEdit showModal={showModal} setShowModal={setShowModal} showtimeDetail={showtimeDetail} updateShowtime={updateShowtime} />
        </div>
    )
}
