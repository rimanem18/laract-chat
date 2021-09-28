import React from 'react'
import Message from './Message'
import PostForm from './PostForm'

const Top = () => {
  return (
    <>
      <h1>TopPage</h1>
      <div className="container">
        <PostForm />
        <Message />
      </div>
    </>
  )
}

export default Top
