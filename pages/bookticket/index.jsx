import Head from 'next/head'
import BookTicket from '../../components/BookTickets'

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Trang đặt vé</title>
            </Head>

            <BookTicket />
        </>
    )
}