import { useCallback, useEffect, useRef } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  fetchMessages,
  selectChatMessagesEntities,
  selectChatMessagesIds,
  selectChatMessagesPromise,
} from '../features/ChatMessagesSlice'
import { selectPostPromise } from '../features/PostSlise'
import type { RootState, AppDispatch } from './store'

// プレーンな useDispatch と useSelector の代わりにアプリ全体で使用する
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// ChatMessages Selector
export function useChatMessageIds() {
  return useAppSelector(selectChatMessagesIds)
}
export const useChatMessagesEntities = () => {
  return useAppSelector(selectChatMessagesEntities)
}
export const useChatMessagesPromise = () => {
  return useAppSelector(selectChatMessagesPromise)
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
