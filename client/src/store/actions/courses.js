import * as actionTypes from './actionTypes';
import axios from 'axios';

const baseurl = 'http://localhost:7000';

export const courseStart = () =>{
	return {
		type:actionTypes.COURSE_START
	};
};

export const courseSuccess = (courses) =>{
	return {
		type:actionTypes.COURSE_SUCCESS,
		courses:courses
	};
};

export const courseFailure = (error) =>{
	return {
		type:actionTypes.COURSE_FAIL,
		error:error
	};
};

export const fetchCourses = () =>{
	return async dispatch =>{
    axios.get(baseurl+'/getCourses')
    .then(response => {
       dispatch(courseSuccess(response.data));
    })
    .catch(error => {
        dispatch(courseFailure(error));
        console.log(error);
    });
	};
}