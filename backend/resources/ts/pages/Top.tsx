import { Grid } from '@mui/material'
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
        <>
          <Grid container spacing={2}>
            <Grid item md={3} xs={12}>
              <Sidebar />
            </Grid>
            <Grid item md={9} xs={12}>
              <Message />
              <PostForm />
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default React.memo(Top)
