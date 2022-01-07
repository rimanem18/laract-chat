import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

import {
  chatMessagesPromiseSelector,
  messageContentSelector,
  messageDatetimeSelector,
  messageGroupIdSelector,
  messageNameSelector,
  messageRoleColorSelector,
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
  groupNameSelector,
  groupPathSelector,
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
  const name = useAppSelector(authNameSelector)
  const email = useAppSelector(authEmailSelector)
  const password = useAppSelector(authPasswordSelector)
  const message = useAppSelector(authMessageSelector)
  const promise = useAppSelector(authPromiseSelector)

  const authState = {
    name,
    email,
    password,
    message,
    promise,
  }
  return authState
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

// Groups Slice
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

export const useGroupName = (id: string) => {
  const nameFactory = useAppSelector(groupNameSelector)
  const name = useMemo(() => {
    return nameFactory(id)
  }, [nameFactory, id])

  return name
}
export const useGroupPath = (id: string) => {
  const pathFactory = useAppSelector(groupPathSelector)
  const path = useMemo(() => {
    return pathFactory(id)
  }, [pathFactory, id])

  return path
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
  const promise = useAppSelector(chatMessagesPromiseSelector)

  const chatMessagesState = {
    messages,
    promise,
  }
  return chatMessagesState
}

export const useMessageName = (id: string) => {
  const nameFactory = useAppSelector(messageNameSelector)
  const name = useMemo(() => {
    return nameFactory(id)
  }, [nameFactory, id])

  return name
}
export const useMessageContent = (id: string) => {
  const contentFactory = useAppSelector(messageContentSelector)
  const content = useMemo(() => {
    return contentFactory(id)
  }, [contentFactory, id])

  return content
}
export const useMessageDatatime = (id: string) => {
  const datetimeFactory = useAppSelector(messageDatetimeSelector)
  const datetime = useMemo(() => {
    return datetimeFactory(id)
  }, [datetimeFactory, id])

  return datetime
}
export const useMessageRoleColor = (id: string) => {
  const roleColorFactory = useAppSelector(messageRoleColorSelector)
  const roleColor = useMemo(() => {
    return roleColorFactory(id)
  }, [roleColorFactory, id])

  return roleColor
}

export const useMessageGroupId = (id: string) => {
  const groupIdFactory = useAppSelector(messageGroupIdSelector)
  const groupId = useMemo(() => {
    return groupIdFactory(id)
  }, [groupIdFactory, id])

  return groupId
}

export const usePostState = () => {
  const userId = useAppSelector(postUserIdSelector)
  const content = useAppSelector(postContentSelector)
  const promise = useAppSelector(postPromiseSelector)

  const postState = {
    userId,
    content,
    promise,
  }
  return postState
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
