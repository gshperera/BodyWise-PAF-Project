import axios from "axios";
import { API_BASE_URL } from "../../api/axiosConfig";
import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./auth.actionType";

export const loginUserAction = (loginData)=> async(dispatch) => {

    dispatch({type:LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/login`, loginData);

        if(data.token){
            localStorage.setItem("jwt", data.token)
        }

        console.log("login success...", data)
        dispatch({type:LOGIN_SUCCESS, payload:data.jwt})
    } catch (error) {
        console.log("login error------------", error)
        dispatch({type:LOGIN_FAILURE, payload: error})
    }
}

export const registerUserAction = (registerData)=> async(dispatch) => {

    dispatch({type:REGISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);

        if(data.token){
            localStorage.setItem("jwt", data.token)
        }

        console.log("registered successfully", data)
        dispatch({type:REGISTER_SUCCESS, payload:data.jwt})
    } catch (error) {
        console.log("register error-------------", error)
        dispatch({type:REGISTER_FAILURE, payload: error})
    }
}

export const getProfileAction = (jwt)=> async(dispatch) => {

    dispatch({type: GET_PROFILE_REQUEST});

    try {
        const {data} = await axios.get(`${API_BASE_URL}/api/user/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });

        console.log("profile...........", data)
        dispatch({type:GET_PROFILE_SUCCESS, payload:data});
    } catch (error) {
        console.log("profile error-------------", error)
        dispatch({type:GET_PROFILE_FAILURE, payload: error})
    }
}