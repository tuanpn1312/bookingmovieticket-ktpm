import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import { Table, Tag, Space, Popconfirm, message } from 'antd';

import apiService from '../../../utils/api/apiService';
import moment from 'moment';
import numberFormat from '../../../utils/modules/numberFormat';


export default function AdminBills() {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(false);

    const getBills = async () => {
        try {
            setLoading(true);
            const response = await apiService.get('/bills');
            setBills(response.data);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'users',
            key: 'users',
            render: user => <div>{user[0].fullName}</div>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'users',
            key: 'users',
            render: user => <div>{user[0].phone}</div>,
        },
        {
            title: 'Phim',
            dataIndex: 'movieTitle',
            key: 'movieTitle',
        },
        {
            title: 'Rạp',
            dataIndex: 'cinemaName',
            key: 'cinemaName',
        },
        {
            title: 'Phòng',
            dataIndex: 'room',
            key: 'room',
        },
        {
            title: 'Thanh toán',
            dataIndex: 'checkoutDate',
            key: 'checkoutDate',
            render: date => <span>{moment(date).format("DD-MM-YYYY HH:ss")}</span>,
        },
        {
            title: 'Số vé',
            dataIndex: 'seat',
            key: 'seat',
            render: seat => <span>{seat.length}</span>
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (price, record) => <span>{numberFormat(price / record.seat.length)}</span>
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'price',
            key: 'price',
            render: price => <span>{numberFormat(price)}</span>
        },
    ];

    useEffect(() => {
        getBills();
    }, [])
    return (
        <div>
            <div className="text-right mb-2">
                <Tag color="lime" className="text-lg">Doanh thu: {
                    numberFormat(bills.reduce((prev, current) => prev + current.price, 0))
                } đồng</Tag>
            </div>
            <Table loading={loading} columns={columns} dataSource={bills} />
        </div>
    )
}
