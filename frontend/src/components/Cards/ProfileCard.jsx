import React from 'react'
import { FaUserAlt } from "react-icons/fa";

const ProfileCard = ({email, role, id}) => {
  return (
    <div className='p-2 rounded-md flex items-center justify-center gap-2'>
      <div>
        <FaUserAlt className='text-2xl bg-amber-50 rounded-full' />
      </div>
      <div>
          <p className='text-2xl'>{email}</p>
          <p className='text-xl'>{role}</p>
          <p>{id}</p>       
      </div>

    </div>
  )
}

export default ProfileCard