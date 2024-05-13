import { Avatar, Button, Divider } from '@mui/material'
import React, { useState } from 'react'
import './sidebar.css'
import name from '../../assets/name.png'
import logo from '../../assets/logo-black.png'
import { navigationMenu } from './NavigationMenu'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { CreateWorkoutPlanModal } from '../createWorkoutPlan/CreateWorkoutPlanModal'


export const SideBar = () => {
    const {auth} = useSelector(store => store)
    const navigate = useNavigate();
    const location = useLocation();

    const [openCreateWorkoutPlanModal, setOpenCreateWorkoutPlanModal] = useState();

    const handleCloseCreateWorkoutModal = ()=> setOpenCreateWorkoutPlanModal(false);
    const handleOpenCreateWorkoutModal = ()=>{
      setOpenCreateWorkoutPlanModal(true)
      console.log("open workout modal.....");
    }
    
    return (
        <div className='h-screen flex justify-between flex-col py-5 pt-6'>
            <div className='space-y-8'>
                <div className='flex'>
                    {/* <div className='w-20 ml-5'>
                        <img src={logo} alt='logo'/>
                    </div> */}
                    <div className='ml-4 flex items-center ml-8' style={{width: '150px'}}>
                        <img src={name} alt="name"/>
                    </div>
                </div>
               
                <div className='space-y-1'>
                  {navigationMenu.map((item, index)=> 
                    <div className={`cursor-pointer py-4 nav-tab ${item.path === location.pathname ? 'active-tab' : ''}`} key={index} onClick={()=>navigate(item.path)}>
                      <div className='flex gap-3 ml-7' style={{ backgroundColor: 'inherit' }}>
                      {item.icon}
                      <p className=''>{item.title}</p>
                      </div>
                    </div>
                  )}
                </div>
            </div>
            <div>
              <Divider/>
              <div className='p-5'>
                <Button variant="success" style={{ backgroundColor: '#24a621'}} className='fw-bold my-5' onClick={handleOpenCreateWorkoutModal}>POST WORKOUT PLAN</Button>
                <CreateWorkoutPlanModal handleClose={handleCloseCreateWorkoutModal} open={openCreateWorkoutPlanModal}/>
              </div>
              <div className='pl-5 flex items-center justify-between pt-5'>
                <div className='flex items-center space-x-3'>
                  <Avatar/>
                  <div>
                    <p className='font-bold'>{auth.user?.fname + " " + auth.user?.lname}</p>
                    <p className='opacity-70'>@{auth.user?.fname.toLowerCase() + "-" + auth.user?.lname}</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )
}
