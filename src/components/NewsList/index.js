import React, { Component } from 'react'
import { api } from '@/tools'
import Article from '@/components/Article'

class NewsList extends Component {
  state = {
    articles: [],
    isLoaded: false
  }

  async componentDidMount() {
    const articles = await api.get('/article').then(res => res.data.items)

    this.setState({ articles, isLoaded: true })
  }

  render() {
    const { articles } = this.state

    return (
      <ul className="news-list">
        {articles.map((article, index) => (
          <li key={article._id} className="news-list__item">
            <Article article={article} index={index} />
          </li>
        ))}
      </ul>
    )
  }
}

export default NewsList
