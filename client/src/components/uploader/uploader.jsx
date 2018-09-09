import React, { Component } from 'react'
import LoadingBar from './loading-bar'
import AttachedFile from './attached-file'
import axios from 'axios'

export default class Uploader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: '',
      uploading: false,
      // Files from endpoint
      files: []
    }
  }

  componentDidMount () {
    this.fetchFiles()
  }

  submitForm (e) {
    const { file } = this.state
    e.preventDefault()
    this.setState({ uploading: true }, () =>
      this.uploadFile(file)
        .then(this.resetForm())
        .then(this.fetchFiles())
        .catch(err => console.error(err))
    )
  }

  fileInputChange (e) {
    this.setState({
      file: e.target.files[0]
    })
  }

  fetchFiles () {
    // The files from the server aren't
    // being updated because the `this`
    // inside .then() is not bounded to
    // this component `this`
    // TODO: Use redux and redux-thunk
    const url = 'http://localhost:8000/files/'
    return axios.get(url)
      .then(response => this.setState({ files: response.data }))
  }

  uploadFile (file) {
    const url = 'http://localhost:8000/files/upload/'
    const headers = { 'Content-Type': 'multipart/form-data' }
    const formData = new FormData()
    formData.append('file', file, file.name)
    formData.append('name', file.name.split('.')[0])
    return axios.post(url, formData, headers)
  }

  resetForm () {
    // It's not possible to set file input value using `value`
    // directly in render(), so I had to do this
    document.getElementById('file').value = ''
    this.setState({
      file: '',
      uploading: false
    })
  }

  render () {
    const { uploading, file, files } = this.state
    return (
      <div>
        <form onSubmit={e => this.submitForm(e)}>
          <input id='file' type='file' onChange={e => this.fileInputChange(e)} />
          <button type='submit'>Upload</button>
          <AttachedFile file={file} />
        </form>
        <LoadingBar show={uploading} />
        <div>
          <h3>Files from the server</h3>
          {files.map(file => (
            <div key={file.id}>
              <a href={file.file} target='_blank'>{file.name}</a>
              <span> uploaded on: {file.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
