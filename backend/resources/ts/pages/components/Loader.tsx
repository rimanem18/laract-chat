import React from 'react'
import { useAuthPromise, useUserPromise } from '../../app/hooks'

const Loader = () => {
  const authPromise = useAuthPromise()
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
