import Image from "next/image";
import React from 'react'

const ProfileWithServerlessFunction = ({ user }: any) => {

  return (
    <div>

      <Image src={user.data.user.user_metadata.avatar_url} alt='ok' height={100} width={100} />
    </div>
  )
}

export default ProfileWithServerlessFunction