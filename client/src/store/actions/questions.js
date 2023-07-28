import * as actionTypes from './actionTypes';
import axios from 'axios';

const baseurl = 'https://prepzone-c127c4b5869a.herokuapp.com';

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
    dispatch(quesSuccess(questions));
	};
}
