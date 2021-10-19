import React from 'react'
import Message from './Message'
import PostForm from './PostForm'

const Top = () => {
  console.log('Top')

  return (
    <>
      <h1>TopPage</h1>
      <div className="container">
        <Message />
        <PostForm />
      </div>
    </>
  )
}

export default React.memo(Top)
