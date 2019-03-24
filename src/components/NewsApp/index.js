import React from 'react'
import NewsList from '@/components/NewsList'
import './news.scss'

function NewsApp() {
  return (
    <section className="news">
      <h1 className="news__title">News portal</h1>
      <NewsList />
    </section>
  )
}

export default NewsApp
