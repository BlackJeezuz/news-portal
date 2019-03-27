import React, { Component } from 'react'
import cx from 'classnames'
import shave from 'shave'
import { Button, Icon } from '@material-ui/core'
import Comments from '@/components/Comments'
import PropTypes from 'prop-types'
import './article.scss'

class Article extends Component {
  static propTypes = {
    article: PropTypes.objectOf(PropTypes.any).isRequired,
    index: PropTypes.number.isRequired
  }

  state = {
    maxHeight: 65
  }

  componentDidMount() {
    this.shaveText()
    window.addEventListener('resize', this.shaveText)
  }

  componentDidUpdate() {
    this.shaveText()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.shaveText)
  }

  shaveText = () => {
    shave(`#article-${this.props.index} .article__text`, this.state.maxHeight)
  }

  toggleArticle = () => {
    this.setState(prevState => ({
      maxHeight: prevState.maxHeight === 10000 ? 65 : 10000
    }))
  }

  render() {
    const { article, index } = this.props
    const { title, text, createAt } = article
    const { maxHeight } = this.state

    const date = new Date(createAt).toDateString()
    const isOpened = maxHeight === 10000

    return (
      <article className="article" id={`article-${index}`}>
        <Button
          onClick={this.toggleArticle}
          className={cx('article__accordion', { 'is-opened': isOpened })}
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
