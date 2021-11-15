import { Box, Grid } from '@mui/material'
import React from 'react'
import { Redirect } from 'react-router-dom'
import { useUserId } from '../app/hooks'
import Message from '../components/Message'
import PostForm from '../components/PostForm'
import Sidebar from '../components/Sidebar'

const Top = () => {
  const userId = useUserId()

  return (
    <>
      {userId === 0 ? (
        <Redirect to="/login" />
      ) : (
        <div className="flex">
          <Box className="sidebar">
            <Sidebar />
          </Box>
          <Box className="main">
            <Message />
            <PostForm />
          </Box>
        </div>
      )}
    </>
  )
}

export default React.memo(Top)
