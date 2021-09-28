import React, { useState } from 'react'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectChatMessages } from '../../features/ChatMessagesSlice'
import { selectUser } from '../../features/UsersSlice'

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

  return (
    <>
      <form onSubmit={postMessage}>
        <div>
          <p>{user.id}</p>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">投稿</button>
      </form>
    </>
  )
}

export default PostForm
