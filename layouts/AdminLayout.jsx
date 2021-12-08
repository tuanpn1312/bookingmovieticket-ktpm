import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    GlobalOutlined,
    UserOutlined,
    ScheduleOutlined,
    VideoCameraOutlined,
    SolutionOutlined
} from '@ant-design/icons';
import AdminUser from '../components/Admin/User/User';
import AdminMovies from '../components/Admin/Movies/Movies';
import AdminMovieAdd from '../components/Admin/Movies/Add';
import AdminCinemas from '../components/Admin/Cinemas/Cinemas';
import AdminRooms from '../components/Admin/Rooms/Rooms';
import AdminRoomAdd from '../components/Admin/Rooms/Add';
import AdminCinemaAdd from '../components/Admin/Cinemas/Add';
import AdminShowtimes from '../components/Admin/Showtimes/Showtimes';
import AdminShowtimeAdd from '../components/Admin/Showtimes/Add';
import AdminBills from '../components/Admin/Bills/Bills';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminLayout() {

    const [tab, setTab] = useState('user');
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu onClick={({ key: tab }) => setTab(tab)} theme="dark" defaultSelectedKeys={['user']} mode="inline">
                    <Menu.Item key="user" icon={<UserOutlined />}>
                        Quản lý người dùng
                    </Menu.Item>
                    <Menu.Item key="bills" icon={<SolutionOutlined />}>
                        Quản lý hóa đơn
                    </Menu.Item>
                    <SubMenu key="movies-management" icon={<DesktopOutlined />} title="Quản lý phim">
                        <Menu.Item key="movies">Danh sách phim</Menu.Item>
                        <Menu.Item key="add-movies">Thêm phim mới</Menu.Item>
                    </SubMenu>
                    <SubMenu key="cinemas-management" icon={<GlobalOutlined />} title="Quản lý rạp">
                        <Menu.Item key="cinemas">Danh sách rạp</Menu.Item>
                        <Menu.Item key="add-cinema">Thêm rạp mới</Menu.Item>
                    </SubMenu>
                    <SubMenu key="rooms-management" icon={<VideoCameraOutlined />} title="Quản lý phòng chiếu">
                        <Menu.Item key="rooms">Danh sách phòng chiếu</Menu.Item>
                        <Menu.Item key="add-room">Thêm phòng chiếu mới</Menu.Item>
                    </SubMenu>
                    <SubMenu key="showtimes-management" icon={<ScheduleOutlined />} title="Quản lý suất chiếu">
                        <Menu.Item key="showtimes">Danh sách suất chiếu</Menu.Item>
                        <Menu.Item key="add-showtime">Thêm suất chiếu mới</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '16px' }}>
                    <div className="bg-gray-50" style={{ padding: 24, minHeight: 360 }}>
                        {tab === 'user' && <AdminUser />}
                        {tab === 'movies' && <AdminMovies />}
                        {tab === 'add-movies' && <AdminMovieAdd />}
                        {tab === 'cinemas' && <AdminCinemas />}
                        {tab === 'add-cinema' && <AdminCinemaAdd />}
                        {tab === 'rooms' && <AdminRooms />}
                        {tab === 'add-room' && <AdminRoomAdd />}
                        {tab === 'showtimes' && <AdminShowtimes />}
                        {tab === 'add-showtime' && <AdminShowtimeAdd />}
                        {tab === 'bills' && <AdminBills />}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©Trang quản trị của project Movies</Footer>
            </Layout>
        </Layout>

    )
}
