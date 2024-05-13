import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik} from 'formik'
import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';
import * as Yup from "yup";
// import { registerUserAction } from '../../redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../Redux/Auth/auth.action';

const initialValues={fname:"", lname:"", email:"", password:"", gender:""};

const validationSchema={
    email:Yup.string().email("Invalid email").required("Email is required"),
    password:Yup.string().min(6,"Password musht contain at least 6 characters").required("Password is required")
};

export const Register = () => {

    const [gender, setGender] = useState("");
    // const [formValue, setFormValue] = useState
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values)=>{
      values.gender = gender;
        console.log("handle register submit: ", values);
        dispatch(registerUserAction(values));
    }

    const handleChange = (event)=>{
      setGender(event.target.value)
    }

  return (
    <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className='space-y-5'>
                <div className='space-y-5'>
                <div>
                        <Field as={TextField} name="fname" placeholder="First Name" type="text" variant="outlined" fullWidth/>
                        <ErrorMessage name='fname' component={"div"} className='text-red-500'/>
                    </div>
                    <div>
                        <Field as={TextField} name="lname" placeholder="Last Name" type="text" variant="outlined" fullWidth/>
                        <ErrorMessage name='lname' component={"div"} className='text-red-500'/>
                    </div>
                    <div>
                        <Field as={TextField} name="email" placeholder="Email" type="email" variant="outlined" fullWidth/>
                        <ErrorMessage name='email' component={"div"} className='text-red-500'/>
                    </div>
                    <div>
                        <Field as={TextField} name="password" placeholder="Password" type="password" variant="outlined" fullWidth/>
                        <ErrorMessage name='password' component={"div"} className='text-red-500'/>
                    </div>

                    <div>
                      <RadioGroup row aria-label="gender" name="gender" onChange={handleChange}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <ErrorMessage name='gender' component={"div"} className='text-red-500'/>
                      </RadioGroup>
                    </div>
                </div>
                <Button fullWidth type='submit' variant='contained'>Register</Button>
            </Form>
        </Formik>
        <div className='flex gap-3 items-center pt-3'>
            <p>Already have an account?</p>
            <Button onClick={()=>navigate('/')}>Login</Button>
        </div>
    </div>
  )
}
