import React, { useCallback, useEffect, useMemo } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { addMessages, fetchMessages } from '../features/ChatMessagesSlice'
import { selectPostPromise } from '../features/PostSlise'
import type { RootState, AppDispatch } from './store'

import {
  chatMessageIdsSelector,
  chatMessagesEntitiesSelector,
  chatMessagesPromiseSelector,
} from '../features/ChatMessagesSelector'
import {
  userEmailSelector,
  userIdSelector,
  userNameSelector,
  userPromiseSelector,
} from '../features/UserSelector'

// プレーンな useDispatch と useSelector の代わりにアプリ全体で使用する
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// User Selector
export const useUserId = () => {
  return useAppSelector(userIdSelector)
}
export const useUserEmail = () => {
  return useAppSelector(userEmailSelector)
}
export const useUserName = () => {
  return useAppSelector(userNameSelector)
}
export const useUserPromise = () => {
  return useAppSelector(userPromiseSelector)
}

// ChatMessages Selector
export const useChatMessageIds = () => {
  return useAppSelector(chatMessageIdsSelector)
}
export const useChatMessagesEntities = () => {
  return useAppSelector(chatMessagesEntitiesSelector)
}
export const useChatMessagesPromise = () => {
  return useAppSelector(chatMessagesPromiseSelector)
}

// Post Selector
export const usePostPromise = () => {
  return useAppSelector(selectPostPromise)
}

// Render
export const useScrollToBottom = (
  refObject: React.MutableRefObject<HTMLElement | null>
) => {
  const el = refObject.current
  if (el !== null) {
    el.scrollTo(0, el.scrollHeight)
  }
}

/**
 * 日付を 1900-01-01 00:00 形式にして返す
 * @param created_at
 * @returns
 */
export const useFormatDate = (created_at: string) => {
  // ゼロ埋め
  const zeroPadding = useCallback((num: number, len: number) => {
    return (Array(len).join('0') + num).slice(-len)
  }, [])

  // 日付フォーマット
  const date = useMemo(() => new Date(created_at), [])
  const year = date.getFullYear()
  const month = zeroPadding(date.getMonth() + 1, 2)
  const day = zeroPadding(date.getDate(), 2)
  const hour = zeroPadding(date.getHours(), 2)
  const min = zeroPadding(date.getMinutes(), 2)
  const datetime = `${year}/${month}/${day} ${hour}:${min}`

  return datetime
}

/**
 * メッセージが何もフェッチされていないときだけfetchする
 */
export const useInitFetchMessages = () => {
  const chatMessagesIds = useChatMessageIds()
  const chatMessagesPromise = useChatMessagesPromise()
  const dispatch = useAppDispatch()

  useEffect(() => {
    // メッセージが何もフェッチされていないときだけ
    if (chatMessagesIds.length === 0 || chatMessagesPromise !== 'loading') {
      dispatch(fetchMessages())
    }
  }, [])
}

export const useAddMessages = () => {
  const chatMessagesIds = useChatMessageIds()
  const chatMessagesPromise = useChatMessagesPromise()
  const postPromise = usePostPromise()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (postPromise === 'idle' || chatMessagesPromise !== 'loading') {
      dispatch(addMessages())
      // console.log('render')
    }
  }, [postPromise, chatMessagesIds.length])
}
