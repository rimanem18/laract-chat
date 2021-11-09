import React from 'react'
import { Button, IconButton, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import {
  useAppDispatch,
  useParamGroupId,
  usePostContent,
  useUserId,
} from '../app/hooks'
import { getContent, postMessage } from '../slices/PostSlice'

const PostForm = () => {
  const dispatch = useAppDispatch()
  const userId = useUserId()
  const postContent = usePostContent()
  const groupId = useParamGroupId()

  if (groupId === undefined) {
    return null
  }

  // 投稿
  const postMessageHandler = (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    if (postContent === '') return
    e.preventDefault()
    dispatch(
      postMessage({
        userId: userId,
        groupId: Number(groupId),
        content: postContent,
      })
    )
  }

  const changeContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(getContent(e.target.value))
  }

  const onSubmitKeyUpHandler = (e: any) => {
    // ctrl+Enter で送信
    if (e.code === 'Enter' && e.ctrlKey) {
      postMessageHandler(e)
    }
  }

  return (
    <>
      <form className="post-form" onSubmit={postMessageHandler}>
        <TextField
          multiline
          data-testid="textarea"
          className="post-form__input"
          name="content"
          value={postContent}
          onChange={changeContentHandler}
          onKeyUp={onSubmitKeyUpHandler}
          autoFocus
        />
        <IconButton color="primary" type="submit">
          <SendIcon />
        </IconButton>
      </form>
    </>
  )
}

export default React.memo(PostForm)
