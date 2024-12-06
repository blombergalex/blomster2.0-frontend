'use client'

import { Button } from '@nextui-org/react'
import { logOutButtonClasses } from '@/utils/classes'
import { logOut } from '@/actions/log-out'

const LogOutButton = () => {
  return (
    <Button className={logOutButtonClasses} onClick={() => logOut()}>Log out</Button>
  )
}

export default LogOutButton