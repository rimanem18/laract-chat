import React, { useCallback, useEffect, useState } from 'react'
import { Box, IconButton, SwipeableDrawer } from '@mui/material'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import { Redirect } from 'react-router-dom'
import { useUserId } from '../app/hooks'
import Message from '../components/Message'
import PostForm from '../components/PostForm'
import Sidebar from '../components/Sidebar'
import zIndex from '@mui/material/styles/zIndex'

const Top = () => {
  const userId = useUserId()
  const [width, setWidth] = useState<number>(768)
  const [isOpen, setIsOpen] = useState(false)

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

      setIsOpen(open)
    },
    []
  )

  useEffect(() => {
    window.addEventListener(`resize`, updateWidth, {
      capture: false,
      passive: true,
    })
    return () => window.removeEventListener(`resize`, updateWidth)
  })
  const updateWidth = () => {
    setWidth(window.innerWidth)
  }

  return (
    <>
      {userId === 0 ? (
        <Redirect to="/login" />
      ) : (
        <>
          {width >= 768 ? (
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

const PcView = () => {
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
}

type MobileViewProps = {
  isOpen: boolean
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void
}
const MobileView = ({ isOpen, toggleDrawer }: MobileViewProps) => {
  return (
    <>
      <IconButton
        sx={{ position: 'absolute', top: 0, right: 0 }}
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
}
