import { CREATE_COMMENT_WORKOUT_SUCCESS, CREATE_WORKOUT_FAILURE, CREATE_WORKOUT_REQUEST, CREATE_WORKOUT_SUCCESS, DELETE_WORKOUT_FAILURE, DELETE_WORKOUT_REQUEST, DELETE_WORKOUT_SUCCESS, GET_ALL_WORKOUT_FAILURE, GET_ALL_WORKOUT_REQUEST, GET_ALL_WORKOUT_SUCCESS, GET_USERS_WORKOUT_REQUEST, GET_USERS_WORKOUT_SUCCESS, LIKE_WORKOUT_FAILURE, LIKE_WORKOUT_REQUEST, LIKE_WORKOUT_SUCCESS, UPDATE_WORKOUT_FAILURE, UPDATE_WORKOUT_REQUEST, UPDATE_WORKOUT_SUCCESS } from "./workoutplan.actionType"

const initialState = {
    workout: null,
    loading: false,
    error: null,
    workouts: [],
    like: [],
    comments:[],
    newComment : null
}

export const workoutPlanReducer = (state=initialState, action) =>{
    
    switch (action.type) {
        case CREATE_WORKOUT_REQUEST:
        case GET_ALL_WORKOUT_REQUEST:
        case GET_USERS_WORKOUT_REQUEST:
        case LIKE_WORKOUT_REQUEST:
        case DELETE_WORKOUT_REQUEST:
        case UPDATE_WORKOUT_REQUEST:
            return {...state, error:null, loading:true}

        case CREATE_WORKOUT_SUCCESS:
            return {...state, workout:action.payload, workouts: [action.payload,...state.workouts], loading:false, error: null}

        case GET_ALL_WORKOUT_SUCCESS:
            return {...state, workouts:action.payload, loading:false, error:null}

        case GET_USERS_WORKOUT_SUCCESS:
            return {...state, workouts: action.payload, loading:false, error:null};

        case LIKE_WORKOUT_SUCCESS:
            return {...state, like:action.payload,
                 workouts:state.workouts.map((item) => item.id === action.payload.id?action.payload:item), 
                 loading:false, error: null}

        case CREATE_COMMENT_WORKOUT_SUCCESS:
            return {...state, newComment: action.payload, comments: [action.payload, ...state.comments], loading:false, error:null}

        case DELETE_WORKOUT_SUCCESS:
            return {...state, workouts: state.workouts.filter(workout => workout.id !== action.payload.id), loading: false, error: null};
    
        case UPDATE_WORKOUT_SUCCESS:
            return {...state, workouts: state.workouts.map(workout => workout.id === action.payload.id ? action.payload : workout), loading: false, error: null};

        case CREATE_WORKOUT_FAILURE:
        case GET_ALL_WORKOUT_FAILURE:
        case LIKE_WORKOUT_FAILURE:
        case DELETE_WORKOUT_FAILURE:
        case UPDATE_WORKOUT_FAILURE:
            return {...state, error:action.payload, loading:false}

        default:
            return state;
    }
}

