import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState ={
  questions:[],
  solvedQuestions:[],
  error:null,
  loading:false
};

const quesStart = (state,action)=>{
       return updateObject(state,{
        	    error: null,
        	  	loading:true
        	  });		
}

const quesSuccess = (state,action)=>{
       return updateObject(state,{
        	    questions: action.questions.allQuestions.concat(),
        	    solvedQuestions:action.questions.solvedQuestions.concat(),
        	  	loading:false
        	  });		
}
const quesFail = (state,action)=>{
       return updateObject(state,{
        	    error: action.error,
        	  	loading:false
        	  });		
}
const addQuesStart = (state,action)=>{
       return updateObject(state,{
              error: null,
              loading:true
            });   
}

const addQuesSuccess = (state,action)=>{
       return updateObject(state,{ 
              loading:false
            });   
}
const addQuesFail = (state,action)=>{
       return updateObject(state,{
              error: action.error,
              loading:false
            });   
}

const reducer = (state = initialState,action)=>{
	switch(action.type){
		case actionTypes.QUES_START: return quesStart(state,action);
		case actionTypes.QUES_SUCCESS: return quesSuccess(state,action);
		case actionTypes.QUES_FAIL: return quesFail(state,action);
    case actionTypes.ADD_QUES_START: return addQuesStart(state,action);
    case actionTypes.ADD_QUES_SUCCESS: return addQuesSuccess(state,action);
    case actionTypes.ADD_QUES_FAIL: return addQuesFail(state,action); 
    default: return state;
   }
};

export default reducer;