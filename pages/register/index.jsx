import Head from 'next/head'
import Register from '../../components/Register'

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Trang đăng kí</title>
            </Head>

            <Register />
        </>
    )
}
