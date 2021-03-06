import React, { useCallback, useEffect, useState } from 'react'
import { Box, IconButton, SwipeableDrawer, useMediaQuery } from '@mui/material'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import { Redirect } from 'react-router-dom'
import { useAppDispatch, useMenuIsOpen, useUserState } from '../app/hooks'
import Message from '../components/Message'
import PostForm from '../components/PostForm'
import Sidebar from '../components/Sidebar'
import { toggleMenuOpen } from '../slices/MenuSlice'

const Top = () => {
  const dispatch = useAppDispatch()
  const userState = useUserState()
  const isOpen = useMenuIsOpen()
  const maches = useMediaQuery('(min-width:768px)')

  const toggleDrawer = useCallback(
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      dispatch(toggleMenuOpen(open))
    },
    []
  )

  return (
    <>
      {userState.id === 0 ? (
        <Redirect to="/login" />
      ) : (
        <>
          {maches ? (
            <PcView />
          ) : (
            <MobileView isOpen={isOpen} toggleDrawer={toggleDrawer} />
          )}
        </>
      )}
    </>
  )
}
export default React.memo(Top)

const PcView = React.memo(() => {
  return (
    <>
      <div className="flex">
        <Box className="sidebar">
          <Sidebar />
        </Box>
        <Box className="main">
          <Message />
          <PostForm />
        </Box>
      </div>
    </>
  )
})

type MobileViewProps = {
  isOpen: boolean
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void
}
const MobileView = React.memo(({ isOpen, toggleDrawer }: MobileViewProps) => {
  return (
    <>
      <IconButton
        sx={{ position: 'absolute', top: '10px', right: '10px' }}
        onClick={toggleDrawer(!isOpen)}
      >
        <FormatListBulletedIcon />
      </IconButton>
      <div className="flex">
        <SwipeableDrawer
          open={isOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Box className="sidebar">
            <Sidebar />
          </Box>
        </SwipeableDrawer>
        <Box className="main">
          <Message />
          <PostForm />
        </Box>
      </div>
    </>
  )
})
