import React, { useState } from 'react'
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
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer =
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
    }

  return (
    <>
      {userId === 0 ? (
        <Redirect to="/login" />
      ) : (
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
      )}
    </>
  )
}

export default React.memo(Top)
