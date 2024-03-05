import React, { useState } from 'react'

const FileInput = ({onChange}) => {

  
    return (
        <div><input type="file" onChange={onChange} /></div>
    )
}

export default FileInput