import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

import {
  chatMessagesPromiseSelector,
  selectMessages,
} from '../selectors/ChatMessagesSelector'
import {
  userEmailSelector,
  userIdSelector,
  userNameSelector,
  userPromiseSelector,
  userRoleNumberIdsSelector,
  userRolesSelector,
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
  groupsDefaultPathSelector,
  groupsOldestIdSelector,
  groupsPromiseSelector,
  selectGroups,
  selectRoleGroup,
} from '../selectors/GroupsSelector'
import { rolesPromiseSelector, selectRoles } from '../selectors/RolesSelector'
import { useParams } from 'react-router'
import { menuIsOpenSelector } from '../selectors/MenuSelector'

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

// User Slice
export const useUserState = () => {
  const id = useAppSelector(userIdSelector)
  const email = useAppSelector(userEmailSelector)
  const name = useAppSelector(userNameSelector)
  const roles = useAppSelector(userRolesSelector)
  const roleNumberIds = useAppSelector(userRoleNumberIdsSelector)
  const promise = useAppSelector(userPromiseSelector)

  const userState = {
    id,
    email,
    name,
    roles,
    roleNumberIds,
    promise,
  }
  return userState
}

export const useGroupsState = () => {
  const groups = {
    byId: useAppSelector(selectGroups.byId),
    allIds: useAppSelector(selectGroups.allIds),
    allNumberIds: useAppSelector(selectGroups.allNumberIds),
  }
  const roleGroup = {
    byId: useAppSelector(selectRoleGroup.byId),
    allIds: useAppSelector(selectRoleGroup.allIds),
  }
  const promise = useAppSelector(groupsPromiseSelector)
  const oldestId = useAppSelector(groupsOldestIdSelector)
  const defaultPath = useAppSelector(groupsDefaultPathSelector)

  const groupState = {
    groups,
    roleGroup,
    promise,
    oldestId,
    defaultPath,
  }
  return groupState
}

// Menu Selector
export const useMenuIsOpen = () => {
  return useAppSelector(menuIsOpenSelector)
}

// ChatMessages Slice
export const useChatMessagesState = () => {
  const messages = {
    byId: useAppSelector(selectMessages.byId),
    allIds: useAppSelector(selectMessages.allIds),
  }
  const roles = {
    byId: useAppSelector(selectRoles.byId),
    allIds: useAppSelector(selectRoles.allIds),
  }
  const promise = useAppSelector(chatMessagesPromiseSelector)

  const chatMessagesState = {
    messages,
    roles,
    promise,
  }
  return chatMessagesState
}

export const usePostState = () => {
  const postUserId = useAppSelector(postUserIdSelector)
  const postContent = useAppSelector(postContentSelector)
  const postPromise = useAppSelector(postPromiseSelector)

  return {
    postUserId,
    postContent,
    postPromise,
  }
}

export const useRolesState = () => {
  const roles = {
    byId: useAppSelector(selectRoles.byId),
    allIds: useAppSelector(selectRoles.allIds),
  }
  const promise = useAppSelector(rolesPromiseSelector)

  const rolesState = {
    roles,
    promise,
  }

  return rolesState
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
