import React, { Component } from 'react'
import cx from 'classnames'
import shave from 'shave'
import {
  Button,
  Icon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@material-ui/core'
import { ButtonVisibilityContext } from '@/context'
import PropTypes from 'prop-types'
import Comments from '@/components/Comments'
import './article.scss'

const defaultHeight = 62

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Article extends Component {
  static propTypes = {
    article: PropTypes.objectOf(PropTypes.any).isRequired,
    index: PropTypes.number.isRequired
  }

  static contextType = ButtonVisibilityContext

  state = {
    maxHeight: defaultHeight,
    isRemoveModalOpen: false
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

  handleRemoveOpen = () => {
    this.setState({ isRemoveModalOpen: true });
  }

  handleRemoveClose = () => {
    this.setState({ isRemoveModalOpen: false });
  }

  shaveText = () => {
    shave(`#article-${this.props.index} .article__text`, this.state.maxHeight)
  }

  toggleArticle = () => {
    this.setState(prevState => ({
      maxHeight: prevState.maxHeight === 10000 ? defaultHeight : 10000
    }))
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') this.toggleArticle()
  }

  render() {
    const { article, index } = this.props
    const { title, text, createAt } = article
    const { maxHeight, isRemoveModalOpen } = this.state

    const date = new Date(createAt).toDateString()
    const isOpened = maxHeight === 10000

    return (
      <article className="article" id={`article-${index}`}>
        <div
          role="button"
          tabIndex="0"
          onKeyPress={this.handleKeyPress}
          onClick={this.toggleArticle}
          className={cx('article__accordion', { 'is-opened': isOpened })}
        >
          <time className="article__time" dateTime={date}>{ date }</time>
          <h3 className="article__title">{ title }</h3>
          {this.context && <Button onClick={this.handleRemoveOpen} color="secondary"><Icon className="article__remove">delete_forever</Icon></Button>}
          <Icon className="article__icon">keyboard_arrow_down</Icon>
        </div>
        <main className="article__body">
          <div className="article__text">{ text }</div>
        </main>
        <Comments />
        <Dialog
          open={isRemoveModalOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Removing article</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">Are you sure you want to remove this article?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRemoveClose} color="primary">No</Button>
            <Button onClick={this.handleRemoveClose} color="secondary">Yes</Button>
          </DialogActions>
        </Dialog>
      </article>
    )
  }
}

export default Article
