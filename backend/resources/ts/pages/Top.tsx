import React from 'react'
import Message from '../components/Message'
import PostForm from '../components/PostForm'

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
