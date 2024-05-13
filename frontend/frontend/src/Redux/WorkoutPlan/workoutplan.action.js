import { api } from "../../api/axiosConfig"
import { CREATE_COMMENT_WORKOUT_FAILURE, CREATE_COMMENT_WORKOUT_REQUEST, CREATE_COMMENT_WORKOUT_SUCCESS, CREATE_WORKOUT_FAILURE, CREATE_WORKOUT_REQUEST, CREATE_WORKOUT_SUCCESS, DELETE_WORKOUT_FAILURE, DELETE_WORKOUT_REQUEST, DELETE_WORKOUT_SUCCESS, GET_ALL_WORKOUT_FAILURE, GET_ALL_WORKOUT_REQUEST, GET_ALL_WORKOUT_SUCCESS, GET_USERS_WORKOUT_FAILURE, GET_USERS_WORKOUT_REQUEST, GET_USERS_WORKOUT_SUCCESS, LIKE_WORKOUT_FAILURE, LIKE_WORKOUT_REQUEST, LIKE_WORKOUT_SUCCESS, UPDATE_WORKOUT_FAILURE, UPDATE_WORKOUT_REQUEST, UPDATE_WORKOUT_SUCCESS } from "./workoutplan.actionType"

export const createWorkoutPlanAction = (workoutData)=>async(dispatch) =>{

    dispatch({type:CREATE_WORKOUT_REQUEST})
    try {
        
        const {data} = await api.post('/workout-plan', workoutData)

        dispatch({type:CREATE_WORKOUT_SUCCESS, payload: data})
        console.log("created post ", data)
    } catch (error) {
        console.log(error)
        dispatch({type: CREATE_WORKOUT_FAILURE, payload:error})
    }
}

export const getAllWorkoutPlanAction = () => async(dispatch) => {
    
    dispatch({type:GET_ALL_WORKOUT_REQUEST})
    try{
        const {data} = await api.get('/workout-plan');
        dispatch({type:GET_ALL_WORKOUT_SUCCESS, payload:data})
        console.log("all workouts.....", data);

    } catch (error) {
        console.log(error)
        dispatch({type: GET_ALL_WORKOUT_FAILURE, payload:error})
    }
}

export const getUserWorkoutPlanAction = () => async(dispatch) => {
    
    dispatch({type:GET_USERS_WORKOUT_REQUEST})
    try{
        const {data} = await api.get('workout-plan/user');
        dispatch({type:GET_USERS_WORKOUT_SUCCESS, payload:data})
        console.log("users workouts.....", data);

    } catch (error) {
        console.log(error)
        dispatch({type: GET_USERS_WORKOUT_FAILURE, payload:error})
    }
}

// export const updateWorkoutPlanAction = (workoutId) => async(dispatch) => {
    
//     dispatch({type:UPDATE_WORKOUT_REQUEST})
//     try{
//         const {data} = await api.put(`workout-plan/${workoutId}`);
//         dispatch({type:UPDATE_WORKOUT_SUCCESS, payload:data})
//         console.log("updated workouts.....", data);

//     } catch (error) {
//         console.log(error)
//         dispatch({type: UPDATE_WORKOUT_FAILURE, payload:error})
//     }
// }

export const updateWorkoutPlanAction = (workoutId, updatedWorkoutData) => async (dispatch) => {
    dispatch({ type: UPDATE_WORKOUT_REQUEST });
    try {
        const { data } = await api.put(`workout-plan/${workoutId}`, updatedWorkoutData); // Pass updatedWorkoutData
        dispatch({ type: UPDATE_WORKOUT_SUCCESS, payload: data });
        console.log("updated workouts.......", data)
    } catch (error) {
        console.log(error)
        dispatch({ type: UPDATE_WORKOUT_FAILURE, payload: error });
    }
};


export const deleteWorkoutPlanAction = (workoutId) => async(dispatch) => {
    
    dispatch({type:DELETE_WORKOUT_REQUEST})
    try{
        const {data} = await api.delete(`workout-plan/${workoutId}`);
        dispatch({type:DELETE_WORKOUT_SUCCESS, payload:data})
        console.log("Delete mesage.....", data);

    } catch (error) {
        console.log(error)
        dispatch({type: DELETE_WORKOUT_FAILURE, payload:error})
    }
}

export const likeWorkoutPlanAction = (workoutId) => async(dispatch) => {
    
    dispatch({type:LIKE_WORKOUT_REQUEST})
    try{
        const {data} = await api.put(`workout-plan/like/${workoutId}`);
        dispatch({type:LIKE_WORKOUT_SUCCESS, payload:data})
        console.log("like workouts.....", data);

    } catch (error) {
        console.log(error)
        dispatch({type: LIKE_WORKOUT_FAILURE, payload:error})
    }
}

export const createCommentAction = (reqData) => async(dispatch) => {
    
    dispatch({type:CREATE_COMMENT_WORKOUT_REQUEST})
    try{
        const {data} = await api.post(`/comment/${reqData.workoutId}`, reqData.data);
        dispatch({type:CREATE_COMMENT_WORKOUT_SUCCESS, payload:data})
        console.log("comment workouts.....", data);

    } catch (error) {
        console.log(error)
        dispatch({type: CREATE_COMMENT_WORKOUT_FAILURE, payload:error})
    }
}

// export const deleteWorkoutPlanAction = (workoutId) => async (dispatch) => {
//     dispatch({ type: DELETE_WORKOUT_REQUEST });
//     try {
//         const { data } = await api.delete(`workout-plan/${workoutId}`);
//         dispatch({ type: DELETE_WORKOUT_SUCCESS, payload: data });
//     } catch (error) {
//         dispatch({ type: DELETE_WORKOUT_FAILURE, payload: error });
//     }
// };

// export const updateWorkoutPlanAction = (workoutId, updatedWorkoutData) => async (dispatch) => {
//     dispatch({ type: UPDATE_WORKOUT_REQUEST });
//     try {
//         const { data } = await api.put(`workout-plan/${workoutId}`, updatedWorkoutData);
//         dispatch({ type: UPDATE_WORKOUT_SUCCESS, payload: data });
//     } catch (error) {
//         dispatch({ type: UPDATE_WORKOUT_FAILURE, payload: error });
//     }
// };

