import Head from 'next/head'
import UserDetail from '../../components/Userdetail'

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Trang thông tin người dùng</title>
            </Head>

            <UserDetail />
        </>
    )
}