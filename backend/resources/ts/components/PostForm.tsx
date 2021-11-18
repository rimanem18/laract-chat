import React from 'react'
import { Button, IconButton, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import {
  useAppDispatch,
  useParamGroupId,
  usePostContent,
  useUserState,
} from '../app/hooks'
import { getContent, postMessage } from '../slices/PostSlice'

const PostForm = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { userId } = useUserState()
  const postContent = usePostContent()
  const groupId = useParamGroupId()

  if (groupId === undefined) {
    return <p>正しく取得することができませんでした。</p>
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

  // スナップショットテスト用
  let isMultiline: boolean
  if (process.env.NODE_ENV === 'test') {
    isMultiline = false
  } else {
    isMultiline = true
  }

  return (
    <>
      <form className="post-form" onSubmit={postMessageHandler}>
        <TextField
          multiline={isMultiline}
          maxRows="2"
          className="post-form__input"
          name="content"
          onChange={changeContentHandler}
          onKeyUp={onSubmitKeyUpHandler}
          autoFocus
          inputProps={{ 'data-testid': 'post-form', value: postContent }}
        />
        <IconButton color="primary" type="submit">
          <SendIcon />
        </IconButton>
      </form>
    </>
  )
}

export default React.memo(PostForm)
