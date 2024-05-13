import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { Home } from './pages/home/Home'
import { Authentication } from './pages/authentication/Authentication'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProfileAction } from './Redux/Auth/auth.action'
import { store } from './Redux/store'

function App() {
  
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(store => store)

  useEffect(()=>{
    dispatch(getProfileAction(jwt))
    // .then(() => {
    //   // Navigate to Home page after successful profile fetch
    //   navigate('/home'); // Navigate to the root path (Home page)
    // })
    // .catch((error) => {
    //   console.log("Profile fetch error:", error);
    //   // Handle profile fetch error if needed
    // })
},[jwt])

  return (
    <>
     <Routes>
        <Route path='/*' element={auth.user? <Home/>: <Authentication/>}/>
        {/* <Route path='/*' element={<Authentication/>}/>      */}
     </Routes>
    </>
  )
}

export default App
