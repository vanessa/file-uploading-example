import React from 'react'

// TODO: Expand this for multiple files

const AttachedFile = ({ file }) => (
  file && (
    <div>
      <h3>Attached file</h3>
      <ul>
        <li>{file.name} - {file.size} kbs</li>
      </ul>
    </div>
  )
)

export default AttachedFile
