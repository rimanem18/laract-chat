import React from 'react'
import { useAppSelector, useUserPromise } from '../../app/hooks'
import { selectAuthPromise } from '../../features/AuthSlice'

const Loader = () => {
  const authPromise = useAppSelector(selectAuthPromise)
  const userPromise = useUserPromise()

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
