import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer } from './Auth/auth.reducer';
import { workoutPlanReducer } from './WorkoutPlan/workoutplan.reducer';

const rootReducers = combineReducers({
    auth:authReducer,
    workoutPlan: workoutPlanReducer
})
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));