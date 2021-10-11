import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectAuthPromise } from '../../features/AuthSlice'
import { selectPost, selectPostContent } from '../../features/PostSlise'
import { selectUser, selectUserPromise } from '../../features/UserSlice'

const Loader = () => {
  const authPromise = useAppSelector(selectAuthPromise)
  const userPromise = useAppSelector(selectUserPromise)
  const postContent = useAppSelector(selectPostContent)


  return (
    <>
      {[authPromise, userPromise].includes('loading') ? (
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
