import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../contexts/authContext/AuthAction';
import { AuthContext } from '../../contexts/authContext/AuthContext';
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();
  const { dispatch,user } = useContext(AuthContext);
  if(user.createdAt){
    var [yyyy, mm, dd] = user.createdAt.split(/[/:\-T]/);
  }
  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
    
  }
  return (
    <div>
      <header className='bg-[#141414]'>
        <NavLink to="/" className="text-primary font-bold text-3xl">
          PhimNhat
        </NavLink>
        <NavLink to="/profile">
          <img
            src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
            alt="avatar"
            className="cursor-pointer rounded"
          />
        </NavLink>
      </header>
      <main className='pt-24 mx-auto max-w-6xl px-5 pb-12 transition-all md:px-10'>
        <div className='flex flex-col gap-x-4 md:flex-row md:items-center'>
          <h1 className='text-3xl md:text-4xl'>Account</h1>
          <div className='-ml-0.5 flex items-center gap-x-1.5'>
            <img src="https://assets.nflxext.com/ffe/siteui/account/svg/membersince.svg" alt="member" />
            {mm && dd & yyyy ? (
            <p className='text-xs font-semibold text-[#555]'>Member since {`${mm}/${dd}/${yyyy}`}</p>
            ) : ('')}
          </div>
        </div>

        {/* Membership */}

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4>Plan Details</h4>
          <div>
            <h4>Basic</h4>
          </div>
          <p className='cursor-pointer text-blue-500 hover:underline md:text-right'>Change Plan</p>
        </div>


        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4>
            Settings
          </h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={handleLogout}
          >
            Sign out of all devices
          </p>

        </div>

      </main>
    </div>
  );
};

export default Profile;