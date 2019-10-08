import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState ={
  courses:[],
  error:null,
  loading:false,
  addedCourse:null
};

const courseStart = (state,action)=>{
       return updateObject(state,{
        	    error: null,
        	  });		
}

const courseSuccess = (state,action)=>{
       return updateObject(state,{
        	    courses: action.courses.concat()
        	  });		
}
const courseFail = (state,action)=>{
       return updateObject(state,{
        	    error: action.error
        	  });		
}

const addCourseStart = (state,action)=>{
       return updateObject(state,{
              error: null,
              loading:true
            });   
}

const addCourseSuccess = (state,action)=>{
       return updateObject(state,{
              loading:false
            });   
}
const addCourseFail = (state,action)=>{
       return updateObject(state,{
              error: action.error,
              loading:false
            });   
}

const addCourseContentStart = (state,action)=>{
       return updateObject(state,{
              error: null,
              loading:true
            });   
}

const addCourseContentSuccess = (state,action)=>{
       return updateObject(state,{
              loading:false
            });   
}
const addCourseContentFail = (state,action)=>{
       return updateObject(state,{
              error: action.error,
              loading:false
            });   
}

const updateCourseStart = (state,action)=>{
       return updateObject(state,{
              error: null,
              loading:true
            });   
}

const updateCourseSuccess = (state,action)=>{
       return updateObject(state,{
              loading:false
            });   
}
const updateCourseFail = (state,action)=>{
       return updateObject(state,{
              error: action.error,
              loading:false
            });   
}

const updateCourseContentStart = (state,action)=>{
       return updateObject(state,{
              error: null,
              loading:true
            });   
}

const updateCourseContentSuccess = (state,action)=>{
       return updateObject(state,{
              loading:false
            });   
}
const updateCourseContentFail = (state,action)=>{
       return updateObject(state,{
              error: action.error,
              loading:false
            });   
}

const deleteCourseContentStart = (state,action)=>{
       return updateObject(state,{
              error: null,
              loading:true
            });   
}

const deleteCourseContentSuccess = (state,action)=>{
       return updateObject(state,{
              loading:false
            });   
}
const deleteCourseContentFail = (state,action)=>{
       return updateObject(state,{
              error: action.error,
              loading:false
            });   
}

const deleteCourseStart = (state,action)=>{
       return updateObject(state,{
              error: null,
              loading:true
            });   
}

const deleteCourseSuccess = (state,action)=>{
       return updateObject(state,{
              loading:false
            });   
}
const deleteCourseFail = (state,action)=>{
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
    case actionTypes.ADD_COURSE_START: return addCourseStart(state,action);
    case actionTypes.ADD_COURSE_SUCCESS: return addCourseSuccess(state,action);
    case actionTypes.ADD_COURSE_FAIL: return addCourseFail(state,action);
    case actionTypes.ADD_COURSE_CONTENT_START: return addCourseContentStart(state,action);
    case actionTypes.ADD_COURSE_CONTENT_SUCCESS: return addCourseContentSuccess(state,action);
    case actionTypes.ADD_COURSE_CONTENT_FAIL: return addCourseContentFail(state,action);
    case actionTypes.UPDATE_COURSE_START: return updateCourseStart(state,action);
    case actionTypes.UPDATE_COURSE_SUCCESS: return updateCourseSuccess(state,action);
    case actionTypes.UPDATE_COURSE_FAIL: return updateCourseFail(state,action);
    case actionTypes.UPDATE_COURSE_CONTENT_START: return updateCourseContentStart(state,action);
    case actionTypes.UPDATE_COURSE_CONTENT_SUCCESS: return updateCourseContentSuccess(state,action);
    case actionTypes.UPDATE_COURSE_CONTENT_FAIL: return updateCourseContentFail(state,action);
    case actionTypes.DELETE_COURSE_CONTENT_START: return updateCourseContentStart(state,action);
    case actionTypes.DELETE_COURSE_CONTENT_SUCCESS: return updateCourseContentSuccess(state,action);
    case actionTypes.DELETE_COURSE_CONTENT_FAIL: return updateCourseContentFail(state,action);
    case actionTypes.DELETE_COURSE_START: return deleteCourseStart(state,action);
    case actionTypes.DELETE_COURSE_SUCCESS: return deleteCourseSuccess(state,action);
    case actionTypes.DELETE_COURSE_FAIL: return deleteCourseFail(state,action);
    default: return state;
  }
};

export default reducer;