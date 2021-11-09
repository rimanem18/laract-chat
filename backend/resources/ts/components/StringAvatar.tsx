import { Avatar } from '@mui/material'
import React from 'react'

type StringAvatarProps = {
  name: string
}
const StringAvatar = ({ name = '' }: StringAvatarProps) => {
  const stringToColor = (string: string) => {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.substr(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  const stringAvatar = (name: string) => {
    return {
      title: name,
      sx: {
        bgcolor: stringToColor(name),
        m: 1,
      },
      children: `${name.charAt(0)}`,
    }
  }

  return (
    <>
      {name ? (
        <Avatar data-testid="user-name" {...stringAvatar(name)}></Avatar>
      ) : (
        <Avatar data-testid="user-name" sx={{ m: 1 }}></Avatar>
      )}
    </>
  )
}

export default React.memo(StringAvatar)
