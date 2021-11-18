import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import {
  groupIdsSelector,
  groupsEntitiesSelector,
  groupsOldestIdSelector,
  groupsPromiseSelector,
} from '../selectors/GroupsSelector'
import { fetchGroups } from '../slices/GroupsSlice'
import { useParams } from 'react-router'
import { menuIsOpenSelector } from '../selectors/MenuSelector'
import { toggleMenuOpen } from '../slices/MenuSlice'

// プレーンな useDispatch と useSelector の代わりにアプリ全体で使用する
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// AuthSlice
export const useAuthState = () => {
  const authName = useAppSelector(authNameSelector)
  const authEmail = useAppSelector(authEmailSelector)
  const authPassword = useAppSelector(authPasswordSelector)
  const authMessage = useAppSelector(authMessageSelector)
  const authPromise = useAppSelector(authPromiseSelector)

  return {
    authName,
    authEmail,
    authPassword,
    authMessage,
    authPromise,
  }
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

// Groups Selector
export const useGroupsIds = () => {
  return useAppSelector(groupIdsSelector)
}
export const useGroupsEntities = () => {
  return useAppSelector(groupsEntitiesSelector)
}
export const useGroupsPromise = () => {
  return useAppSelector(groupsPromiseSelector)
}
export const useGroupsOldestId = () => {
  return useAppSelector(groupsOldestIdSelector)
}

// Menu Selector
export const useMenuIsOpen = () => {
  return useAppSelector(menuIsOpenSelector)
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
    }
  }, [postPromise, chatMessagesIds.length])
}

/**
 * グループ一覧を初回だけフェッチする
 */
export const useFetchGroups = () => {
  const groupsPromise = useGroupsPromise()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (groupsPromise !== 'loading') {
      dispatch(fetchGroups())
    }
  }, [])
}

/**
 * URL から groupId を取得して返す
 * @returns string?
 */
export const useParamGroupId = () => {
  const { groupId } = useParams<{ groupId?: string }>()
  return groupId
}

export const useGroupModal = (groupName: string) => {
  const [isConfirm, setIsConfirm] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [isOver, setIsOver] = useState(false)
  const dispatch = useAppDispatch()

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])
  const closeModal = useCallback(() => {
    setIsOpen(false)
    setIsConfirm(false)
  }, [])
  const openConfirm = useCallback(() => {
    setIsConfirm(true)
  }, [])
  const closeConfirm = useCallback(() => {
    setIsConfirm(false)
  }, [])

  useEffect(() => {
    if (newGroupName.length <= 15) {
      setIsOver(false)
    } else {
      setIsOver(true)
    }
  }, [newGroupName])

  return [
    { isOpen, isConfirm, isOver, newGroupName },
    { openModal, closeModal, openConfirm, closeConfirm, setNewGroupName },
  ] as const
}

export const useDefaultGroupPath = () => {
  const oldestGroupsId = useGroupsOldestId().toString()
  const groupPromise = useGroupsPromise()
  const [path, setPath] = useState('')

  useEffect(() => {
    if (groupPromise !== 'loading') {
      setPath(`/groups/${oldestGroupsId}`)
    }
  }, [groupPromise])

  return path
}
