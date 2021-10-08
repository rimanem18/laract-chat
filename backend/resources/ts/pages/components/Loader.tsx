import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectAuthPromise } from '../../features/AuthSlice'
import { selectPost } from '../../features/PostSlise'
import { selectUser } from '../../features/UserSlice'

const Loader = () => {
  const authPromise = useAppSelector(selectAuthPromise)
  const user = useAppSelector(selectUser)
  const post = useAppSelector(selectPost)

  return (
    <>
      {[authPromise, user.promise, post.promise].includes('loading') ? (
        <>
          <div className="loader-overlay"></div>
          <i className="loader fa fa-spinner fa-spin fa-5x"></i>
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default Loader
