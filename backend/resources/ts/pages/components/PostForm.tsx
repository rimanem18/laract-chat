import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectChatMessages } from '../../features/ChatMessagesSlice'
import { selectUserId, selectUserName, selectUserEmail, selectUser, fetchUser } from '../../features/UserSlice'
import { Link } from 'react-router-dom'
import { getContent, postMessage, selectPost } from '../../features/PostSlise'

const PostForm = () => {
  const [content, setContent] = useState('')
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const post = useAppSelector(selectPost)

  // 投稿
  const postMessageHandler = async (e: any) => {
    e.preventDefault()
    dispatch(postMessage({ userId: user.id, content: post.content }))
  }

  const changeContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(getContent(e.target.value))
  }

  return (
    <>
      {
        user.id === 0 ?
          <p>書き込みをするには <Link to='/auth'>ログイン</Link> してください。 </p>
          : <>
            <form className="form" onSubmit={postMessageHandler}>
              <div>
                <p>id: {user.id}</p>
                <p>name: {user.name}</p>
                <p>email: {user.email}</p>
              </div>
              <textarea
                name="content"
                value={post.content}
                onChange={changeContentHandler}
              ></textarea>
              <button className="d-block btn btn-primary" type="submit">投稿</button>
            </form>
          </>
      }
    </>
  )
}

export default PostForm
