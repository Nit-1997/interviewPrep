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

const reducer = (state = initialState,action)=>{
	switch(action.type){
		case actionTypes.QUES_START: return quesStart(state,action);
		case actionTypes.QUES_SUCCESS: return quesSuccess(state,action);
		case actionTypes.QUES_FAIL: return quesFail(state,action);
        default: return state;
    }
};

export default reducer;