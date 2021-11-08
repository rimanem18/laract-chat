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
          <Grid container>
            <Grid item lg={3} md={3} sm={12}>
              <Sidebar />
            </Grid>
            <Grid item lg={9} sm={12}>
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
