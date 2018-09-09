import React, { Component } from 'react'
import Uploader from 'components/uploader'

export default class Page extends Component {
  render () {
    return (
      <div>
        <h1>File uploader</h1>
        <Uploader />
      </div>
    )
  }
}
