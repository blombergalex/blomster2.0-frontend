'use client'

import { Button } from '@nextui-org/react'
import { logOutButtonClasses } from '@/utils/classes'

const LogOutButton = () => {

  const logOut = () => {
    console.log("logging out") // create actual log out action
  }

  return (
    <Button className={logOutButtonClasses} onClick={() => logOut()}>Log out</Button>
  )
}

export default LogOutButton