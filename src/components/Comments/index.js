import React, { Component } from 'react'

class Comments extends Component {
  state = {
    isOpened: false
  }

  toggleComments = () => {
    this.setState(prevState => ({
      isOpened: !prevState.isOpened
    }))
  }

  render() {
    const { comments } = this.props

    return (
      <div className="comments">{ comments }</div>
    )
  }
}

export default Comments
