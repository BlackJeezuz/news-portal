import React, { Component } from 'react'
import cx from 'classnames'
import { Button, Icon } from '@material-ui/core'
import Comments from '@/components/Comments'
import './article.scss'

class Article extends Component {
  state = {
    isOpened: false
  }

  toggleArticle = () => {
    this.setState(prevState => ({
      isOpened: !prevState.isOpened
    }))
  }

  render() {
    const { article } = this.props
    const { title, text, createAt } = article
    const date = new Date(createAt).toDateString()

    return (
      <article className="article">
        <Button
          onClick={this.toggleArticle}
          className={cx('article__accordion', { 'is-opened': this.state.isOpened })}
        >
          <time className="article__time" dateTime={date}>{ date }</time>
          <h3 className="article__title">{ title }</h3>
          <Icon className="article__icon">keyboard_arrow_down</Icon>
        </Button>
        <main className="article__body">
          <div className="article__text">{ text }</div>
        </main>
        <Comments />
      </article>
    )
  }
}

export default Article
