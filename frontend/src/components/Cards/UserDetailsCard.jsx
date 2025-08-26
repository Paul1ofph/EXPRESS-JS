import React from 'react'

const UserDetailsCard = ({email, role}) => {
  return (
    <div>
        <p>Your Email : {email}</p>
        <p>Role: {role}</p>
    </div>
  )
}

export default UserDetailsCard