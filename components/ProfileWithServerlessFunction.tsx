
import Image from "next/image";
import React from 'react'
import styles from './../styles/wrapper.module.css'

const ProfileWithServerlessFunction = ({ user }: any) => {

  const { user_metadata: { avatar_url, preferred_username, name }, email,
  } = user

  return (
    <>
      {user &&
        <div className={styles.wrapper}>

          <div className={styles.githubImageWrapper}>
            {avatar_url && <Image src={avatar_url} alt='ok' height={100} width={100} />}
          </div>

          <div>
            {email && <>  <label> Welcome </label> <p>{email}</p></>}
            {preferred_username && <><label> Username : </label> <p>{preferred_username}</p></>}
            {name && <> <label> Name : </label> <p>{name}</p> </>}
          </div>
        </div>}
    </>

  )
}

export default ProfileWithServerlessFunction