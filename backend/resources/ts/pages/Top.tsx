import React from 'react'
import { Redirect } from 'react-router-dom'
import { useUserId } from '../app/hooks'
import Message from '../components/Message'
import PostForm from '../components/PostForm'
import Sidebar from '../components/Sidebar'

const Top = () => {
  const userId = useUserId()

  return (
    <>
      {userId === 0 ? (
        <Redirect to="/login" />
      ) : (
        <>
          <h1>TopPage</h1>
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <Message />
              <PostForm />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default React.memo(Top)
