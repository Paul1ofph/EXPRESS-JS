import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import UserDetailsCard from '../../components/Cards/UserDetailsCard'

const Dashboard = () => {
    const { user } = useContext(UserContext);
    console.log("Dashboard user:", user);
  return (
    <div>
        <h1>Dashboard</h1>
        {user && (
            <div>
                User Details
                <UserDetailsCard
                email={user && user.email}
                role={user && user.role}
                />
            </div>
        )}
        <h2>Hello {user.email}</h2>
    </div>
  )
}

export default Dashboard