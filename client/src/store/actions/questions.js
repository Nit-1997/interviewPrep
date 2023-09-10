import * as actionTypes from './actionTypes';
import axios from 'axios';
// import {baseurl} from '../../constants';

const baseurl = 'https://prepzone-backend-svc.onrender.com';

export const quesStart = () =>{
	return {
		type:actionTypes.QUES_START
	};
};

export const quesSuccess = (questions) =>{
	return {
		type:actionTypes.QUES_SUCCESS,
		questions:questions
	};
};

export const quesFailure = (error) =>{
	return {
		type:actionTypes.QUES_FAIL,
		error:error
	};
};

export const fetchQuestions = (username) =>{
	return async dispatch =>{
    let questions = {
       solvedQuestions : [],
       allQuestions : []
    }
    await axios.post(baseurl+'/getSolved',{username:username})
      .then(response => {
        console.log(response.data);
        questions.solvedQuestions = response.data;
      })
      .catch(error => {
       dispatch(quesFailure(error));
       console.log(error);
     });
      
    await axios.get(baseurl+'/getQuestion')
      .then(response => {
        questions.allQuestions = response.data;
      })
      .catch(error => {
       dispatch(quesFailure(error));
       console.log(error);
     });
     console.log(questions);
    localStorage.setItem('quesData',  JSON.stringify(questions));
    dispatch(quesSuccess(questions));
	};
}


export const addQuesStart = () =>{
  return {
    type:actionTypes.ADD_QUES_START
  };
};

export const addQuesSuccess = (question) =>{
  return {
    type:actionTypes.ADD_QUES_SUCCESS,
    questions:question
  };
};

export const addQuesFailure = (error) =>{
  return {
    type:actionTypes.ADD_QUES_FAIL,
    error:error
  };
};

export const addQuestions = (formData,username) =>{
  return async dispatch =>{
    dispatch(addQuesStart());
    let url = baseurl+'/createQuestion';
    axios.post(url,formData)
            .then(response=>{
               localStorage.removeItem('quesData');
               dispatch(fetchQuestions(username));
               localStorage.setItem('addedQuestion',  JSON.stringify(response.data));
               dispatch(addQuesSuccess(response.data));
             })
            .catch(function (error) {
              console.log(error);
            });
  };
}