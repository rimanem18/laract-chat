import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectUser } from '../../features/UserSlice'
import { Link } from 'react-router-dom'
import { getContent, postMessage, selectPost, selectPostContent } from '../../features/PostSlise'

const PostForm = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const postContent = useAppSelector(selectPostContent)

  // 投稿
  const postMessageHandler = (e: any) => {
    if (postContent === "") return
    e.preventDefault()
    dispatch(postMessage({ userId: user.id, content: postContent }))
  }

  const changeContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(getContent(e.target.value))
  }

  const onSubmitKeyUpHandler = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    // ctrl+Enter で送信
    if (e.code === 'Enter' && e.ctrlKey) {
      postMessageHandler(e)
    }
  }

  return (
    <>
      {user.id === 0 ? (
        <p>
          書き込みをするには <Link to="/login">ログイン</Link> してください。{' '}
        </p>
      ) : (
        <form className="form post-form mt-1">
          <textarea
            className="post-form__input"
            name="content"
            value={postContent}
            onChange={changeContentHandler}
            onKeyUp={onSubmitKeyUpHandler}
            autoFocus
          ></textarea>
          <button className="btn btn-primary mx-1 align-top" onClick={postMessageHandler} type="button">
            投稿
          </button>
        </form>
      )}
    </>
  )
}

export default PostForm
