import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectChatMessages } from '../../features/ChatMessagesSlice'
import { selectUserId, selectUserName, selectUserEmail, selectUser, fetchUser } from '../../features/UserSlice'
import { Link } from 'react-router-dom'

const PostForm = () => {
  const [userId, setUserId] = useState(1)
  const [content, setContent] = useState('')
  const dispatch = useAppDispatch()
  const chatMessages = useAppSelector(selectChatMessages)
  const user = useAppSelector(selectUser)


  // 投稿
  const postMessage = async (e: any) => {
    e.preventDefault()

    axios
      .post('/api/chat_messages/post', {
        userId: user.id,
        content: content,
      })
      .then((res) => {
        // 成功したらメッセージクリア
        setContent('')
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (user.promise !== 'fulfilled') {
      dispatch(fetchUser())
    }
  }, [user.id])

  return (
    <>
      {
        user.id === 0 ?
          <p>書き込みをするには <Link to='/auth'>ログイン</Link> してください。 </p>
          : <>
            <form className="form" onSubmit={postMessage}>
              <div>
                <p>id: {user.id}</p>
                <p>name: {user.name}</p>
                <p>email: {user.email}</p>
              </div>
              <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </form>
            <button className="btn btn-primary" type="submit">投稿</button>
          </>
      }
    </>
  )
}

export default PostForm
