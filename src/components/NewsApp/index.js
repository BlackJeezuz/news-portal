import React, { Component } from 'react'
import NewsList from '@/components/NewsList'
import { ButtonVisibilityContext } from '@/context'
import Switch from '@material-ui/core/Switch'
import './news.scss'

class NewsApp extends Component {
  state = {
    isRemoveShowen: true
  }

  handleRemoveVisibility = () => {
    this.setState(prevState => ({ isRemoveShowen: !prevState.isRemoveShowen }))
  }

  render() {
    const { isRemoveShowen } = this.state
    return (
      <section className="news">
        <h1 className="news__title">News portal</h1>
        <div className="news__controls">
          <div>Show remove:</div>
          <Switch color="primary" checked={isRemoveShowen} onChange={this.handleRemoveVisibility} />
        </div>
        <ButtonVisibilityContext.Provider value={isRemoveShowen}>
          <NewsList />
        </ButtonVisibilityContext.Provider>
      </section>
    )
  }
}

export default NewsApp
