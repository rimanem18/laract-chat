import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectAuth } from '../../features/AuthSlice'
import { selectPost } from '../../features/PostSlise'
import { selectUser } from '../../features/UserSlice'

const Loader = () => {
  const auth = useAppSelector(selectAuth)
  const user = useAppSelector(selectUser)
  const post = useAppSelector(selectPost)

  return (
    <>
      {
        [
          auth.promise,
          user.promise,
          post.promise
        ].includes('loading') ?
          <>
            <div className="loader-overlay">
            </div>
            <i className="loader fa fa-spinner fa-spin fa-5x" ></i>
          </>
          : ""
      }
    </>
  )
}

export default Loader
