import React from 'react'

import DefaultLayout from '../../layouts/Default'
import HomeBanner from './Banner'
import Cinemas from './Cinemas'
import MovieList from './MovieList'

export default function Home() {
    return (
        <DefaultLayout >
            <HomeBanner />
            <MovieList />
            <Cinemas />
        </DefaultLayout>
    )
}


