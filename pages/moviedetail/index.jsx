import Head from 'next/head'
import MovieDetail from '../../components/MovieDetail'

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Trang phim</title>
            </Head>

            <MovieDetail />
        </>
    )
}