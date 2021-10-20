import React, { useCallback, useEffect, useMemo } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { fetchMessages, updateMessages } from '../slices/ChatMessagesSlice'
import type { RootState, AppDispatch } from './store'

import {
  chatMessageIdsSelector,
  chatMessagesEntitiesSelector,
  chatMessagesPromiseSelector,
} from '../selectors/ChatMessagesSelector'
import {
  userEmailSelector,
  userIdSelector,
  userNameSelector,
  userPromiseSelector,
} from '../selectors/UserSelector'
import {
  authEmailSelector,
  authMessageSelector,
  authNameSelector,
  authPasswordSelector,
  authPromiseSelector,
} from '../selectors/AuthSelector'
import {
  postContentSelector,
  postPromiseSelector,
  postUserIdSelector,
} from '../selectors/PostSelector'

// プレーンな useDispatch と useSelector の代わりにアプリ全体で使用する
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Auth Selector
export const useAuthName = () => {
  return useAppSelector(authNameSelector)
}
export const useAuthEmail = () => {
  return useAppSelector(authEmailSelector)
}
export const useAuthPassword = () => {
  return useAppSelector(authPasswordSelector)
}
export const useAuthMessage = () => {
  return useAppSelector(authMessageSelector)
}
export const useAuthPromise = () => {
  return useAppSelector(authPromiseSelector)
}

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
export const usePostUserId = () => {
  return useAppSelector(postUserIdSelector)
}
export const usePostContent = () => {
  return useAppSelector(postContentSelector)
}
export const usePostPromise = () => {
  return useAppSelector(postPromiseSelector)
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
    if (chatMessagesIds.length === 0 || chatMessagesPromise !== 'loading') {
      dispatch(fetchMessages())
      console.log('initFetch')
    }
  }, [])
}

/**
 * メッセージ一覧の差分を取得して更新する
 */
export const useUpdateMessages = () => {
  const chatMessagesIds = useChatMessageIds()
  const chatMessagesPromise = useChatMessagesPromise()
  const postPromise = usePostPromise()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if ([chatMessagesPromise, postPromise].every((v) => v === 'idle')) {
      dispatch(updateMessages())
      console.log('updateFetch')
    }
  }, [postPromise, chatMessagesIds.length])
}
