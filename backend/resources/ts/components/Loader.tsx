import React from 'react'
import { useAuthState, useUserState } from '../app/hooks'

const Loader = () => {
  const { authPromise } = useAuthState()
  const userState = useUserState()

  return (
    <>
      {[authPromise, userState.promise].includes('loading') ? (
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
