import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState ={
  courses:[],
  error:null,
  loading:false
};

const courseStart = (state,action)=>{
       return updateObject(state,{
        	    error: null,
        	  	loading:true
        	  });		
}

const courseSuccess = (state,action)=>{
       return updateObject(state,{
        	    courses: action.courses.concat(),
        	    loading:false
        	  });		
}
const courseFail = (state,action)=>{
       return updateObject(state,{
        	    error: action.error,
        	  	loading:false
        	  });		
}

const reducer = (state = initialState,action)=>{
	switch(action.type){
		case actionTypes.COURSE_START: return courseStart(state,action);
		case actionTypes.COURSE_SUCCESS: return courseSuccess(state,action);
		case actionTypes.COURSE_FAIL: return courseFail(state,action);
        default: return state;
    }
};

export default reducer;