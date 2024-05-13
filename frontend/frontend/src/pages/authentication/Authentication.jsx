import React from 'react'
import {Card, Grid} from '@mui/material';
import img from '../../assets/img2.png';
import name from '../../assets/name for light.png';
import { Login } from './Login';
import { Register } from './Register';
import { Route, Routes } from 'react-router-dom';

export const Authentication = () => {
  return (
    <div>
        <Grid container>
            <Grid item xs={4}>
                <div className='h-full flex flex-col justify-center'>
                    <Card className='p-8 h-full flex items-center border justify-center'>
                        <div>
                            <div className='flex flex-col items-center mb-6 space-y-1 '>
                                <img src={name} alt="brand name" className='w-40' />
                                <p className='text-center text-sm w-[70&]'>Share your progress, inspire others, and let's conquer our fitness goals together! 💪 </p>
                            </div>
                            <Routes>
                                <Route path='/' element={<Login/>}/>
                                <Route path='/login' element={<Login/>}/>
                                <Route path='/register' element={<Register/>}/>
                            </Routes>
                            {/* <Register/> */}
                            {/* <Login/> */}
                        </div>
                    </Card>
                </div>

            </Grid>
            <Grid item xs={8} className='h-screen'>
                <img src={img} alt="" className='h-full w-full' />
            </Grid>

        </Grid>
    </div>
  )
}
