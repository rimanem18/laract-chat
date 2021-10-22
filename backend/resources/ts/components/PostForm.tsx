import React from 'react'
import { useAppDispatch, usePostContent, useUserId } from '../app/hooks'
import { Link } from 'react-router-dom'
import { getContent, postMessage } from '../slices/PostSlice'

const PostForm = () => {
  const dispatch = useAppDispatch()
  const userId = useUserId()
  const postContent = usePostContent()

  // 投稿
  const postMessageHandler = (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    if (postContent === '') return
    e.preventDefault()
    dispatch(postMessage({ userId: userId, content: postContent }))
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

  console.log('PostForm')

  return (
    <>
      {userId === 0 ? (
        <p>
          書き込みをするには <Link to="/login">ログイン</Link> してください。{' '}
        </p>
      ) : (
        <form className="form post-form mt-1" onSubmit={postMessageHandler}>
          <textarea
            data-testid="textarea"
            className="post-form__input"
            name="content"
            value={postContent}
            onChange={changeContentHandler}
            onKeyUp={onSubmitKeyUpHandler}
            autoFocus
          ></textarea>
          <button className="btn btn-primary mx-1 align-top" type="button">
            投稿
          </button>
        </form>
      )}
    </>
  )
}

export default React.memo(PostForm)
