import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import moment from 'moment';
import { Table, Tag, Space, Popconfirm, message } from 'antd';

import apiService from '../../../utils/api/apiService';
import AdminMovieEdit from './Edit';


export default function AdminMovies() {
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [movieDetail, setMovieDetails] = useState({});

    const key = 'fetching';

    const getMovies = async () => {
        try {
            const response = await apiService.get('/movies/getallmovie');
            setMovies(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateMovieStatus = async (record, status) => {
        if (status === 'false') {
            updateMovie(record._id, { ...record, status: 'now showing' });
        } else {
            try {
                message.loading({ content: "Đang cập nhật", key });
                await apiService.delete(`/movies/${record._id}`);
                getMovies();
                message.success({ content: `Đã dừng chiếu phim ${record.title}`, key });
            } catch (error) {
                message.error({ content: "Có lỗi xảy ra", key })
            }
        }
    }

    const updateMovie = async (id, values) => {
        message.loading({ content: "Đang cập nhật", key })
        await apiService.put(`/movies/${id}`, values);
        getMovies();
        message.success({ content: "Cập nhật thành công", key });
        setShowModal(false);
    }

    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'movieImg',
            key: 'movieImg',
            render: img => <div className="flex items-center">
                <img width={120} src={img} alt="ảnh phim" />
            </div>,
        },
        {
            title: 'Tên phim',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <a className="flex items-center cursor-pointer hover:underline"
                onClick={() => {
                    setShowModal(true)
                    setMovieDetails(record)
                }}
            >
                {text}</a>,
        },
        {
            title: 'Ngày ra mắt',
            dataIndex: 'startDate',
            key: 'startDate',
            render: date => <span>{moment(date).format('DD-MM-YYYY')}</span>,
        },
        {
            title: 'Đạo diễn',
            dataIndex: 'direction',
            key: 'direction',
        },
        {
            title: 'Quốc gia',
            dataIndex: 'national',
            key: 'national',
        },
        {
            title: 'Thời lượng',
            dataIndex: 'movieDuration',
            key: 'movieDuration',
            render: text => <span>{text} phút</span>,
        },

        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: status => (
                <>
                    <Tag color={status === 'now showing' ? 'green' : 'volcano'}>
                        {status === 'now showing' ? "Đang chiếu" : status === 'false' ? "Dừng chiếu" : "Sắp chiếu"}
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
                        title={record.status !== 'false' ? `Phim "${record.title}" sẽ dừng chiếu?`
                            : `Phim "${record.title}" sẽ được mở chiếu?`}
                        onConfirm={() => updateMovieStatus(record, record.status)}
                        okText={record.status !== 'false' ? "Dừng chiếu" : "Mở chiếu"}
                        cancelText="Hủy"
                    >
                        <a className={classNames('', {
                            "hover:text-red-400": record.status,
                            "hover:text-green-400": !record.status
                        })}>{record.status !== 'false' ? 'Dừng chiếu' : "Mở chiếu"}</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getMovies();
    }, [])
    return (
        <div>
            <Table
                columns={columns} dataSource={movies}
                pagination={{ defaultPageSize: 6 }}
                scroll={{ y: 500 }} />
            <AdminMovieEdit showModal={showModal} setShowModal={setShowModal} movieDetail={movieDetail} updateMovie={updateMovie} />
        </div>
    )
}
