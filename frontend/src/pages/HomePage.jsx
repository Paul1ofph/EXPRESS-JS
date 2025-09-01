import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='p-5 text-center'>
       <h1 className='text-4xl font-epunda font-bold'>STUDENT MANAGEMENT SYSTEM</h1>
       <p className="text-[16px] text-slate-800 mt-3">
          Login as?{" "}
          <Link className="font-medium text-primary underline" to="/login">
            <p></p>Student
          </Link>
          {" or "}
          <Link className="font-medium text-primary underline" to="/login/admin">
            Admin
          </Link>
        </p>
    </div>
  )
}

export default HomePage