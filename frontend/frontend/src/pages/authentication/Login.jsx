import { Button, TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik, validateYupSchema } from 'formik'
import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';
import * as Yup from "yup";
// import { loginUserAction } from '../../redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../Redux/Auth/auth.action';

const initialValues={email:"", password:""}
// const validationSchema={
//     email:Yup.string().email("Invalid email").required("Email is required"),
//     password:Yup.string().min(6,"Password musht contain at least 6 characters").required("Password is required")
// }

export const Login = () => {

    const [formValue, setFormValue] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values)=>{
        console.log("handle submit:..... ", values);
        dispatch(loginUserAction(values))
    }

  return (
    <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className='space-y-5'>
                <div className='space-y-5'>
                    <div>
                        <Field as={TextField} name="email" placeholder="Email" type="email" variant="outlined" fullWidth/>
                        <ErrorMessage name='email' component={"div"} className='text-red-500'/>
                    </div>
                    <div>
                        <Field as={TextField} name="password" placeholder="Password" type="password" variant="outlined" fullWidth/>
                        <ErrorMessage name='password' component={"div"} className='text-red-500'/>
                    </div>
                </div>
                <Button fullWidth type='submit' variant='contained'>Login</Button>
            </Form>
        </Formik>

        <div className='flex gap-3 items-center pt-3'>
            <p>You don't have an account?</p>
            <Button onClick={()=>navigate('/register')}>Register</Button>
        </div>
    </div>
  )
}
