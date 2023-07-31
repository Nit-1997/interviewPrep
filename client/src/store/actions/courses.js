import * as actionTypes from './actionTypes';
import axios from 'axios';
// import {baseurl} from '../../constants';

const baseurl = 'https://prepzone-c127c4b5869a.herokuapp.com';

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
       localStorage.setItem('courseData',  JSON.stringify(response.data));
       dispatch(courseSuccess(response.data));
    })
    .catch(error => {
        dispatch(courseFailure(error));
        console.log(error);
    });
	};
}


export const addCourseStart = () =>{
	return {
		type:actionTypes.ADD_COURSE_START
	};
};

export const addCourseSuccess = (addedCourse) =>{
	return {
		type:actionTypes.ADD_COURSE_SUCCESS,
		addedCourse:addedCourse
	};
};

export const addCourseFailure = (error) =>{
	return {
		type:actionTypes.ADD_COURSE_FAIL,
		error:error
	};
};

export const addCourses = (formData) =>{
	const url = baseurl+'/createCourse';
	return async dispatch =>{
		dispatch(addCourseStart());
	    axios.post(url,
	          formData, {
	            headers: {
	              'Content-Type': 'multipart/form-data'
	            }
	          }
	        ).then(response=>{
	        	console.log(response.data);
	            localStorage.removeItem('courseData');
	            dispatch(fetchCourses());
	            localStorage.setItem('addedCourse',  JSON.stringify(response.data));
	            dispatch(addCourseSuccess(response.data));
	        })
	        .catch(function (error) {
	          console.log(error);
	          dispatch(addCourseFailure(error));
	        });
	};
}

export const addCourseContentStart = () =>{
	return {
		type:actionTypes.ADD_COURSE_CONTENT_START
	};
};

export const addCourseContentSuccess = () =>{
	return {
		type:actionTypes.ADD_COURSE_CONTENT_SUCCESS
	};
};

export const addCourseContentFailure = (error) =>{
	return {
		type:actionTypes.ADD_COURSE_CONTENT_FAIL,
		error:error
	};
};

export const addCoursesContent = (formData) =>{
	const url = baseurl+'/addlinks';
	return async dispatch =>{
		dispatch(addCourseContentStart());
	    axios.post(url,formData)
            .then(response => {
                console.log(response.data);
                localStorage.removeItem('courseData');
	            dispatch(fetchCourses());
	            localStorage.setItem('addedCourseContent',  JSON.stringify(response.data));
	            dispatch(addCourseContentSuccess());
            }).catch(error => {
                console.log(error);
                dispatch(addCourseContentFailure());
            })
	};
}

export const updateCourseStart = () =>{
	return {
		type:actionTypes.UPDATE_COURSE_START
	};
};

export const updateCourseSuccess = () =>{
	return {
		type:actionTypes.UPDATE_COURSE_SUCCESS
	};
};

export const updateCourseFailure = (error) =>{
	return {
		type:actionTypes.UPDATE_COURSE_FAIL,
		error:error
	};
};

export const updateCourse = (formData) =>{
	const url = baseurl+'/updateCourse';
	return async dispatch =>{
		dispatch(updateCourseStart());
	    axios.post(url,
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(response=>{
            console.log(response);
            localStorage.removeItem('courseData');
	        dispatch(fetchCourses());
	        localStorage.setItem('updatedCourse',  JSON.stringify(response.data));
            dispatch(updateCourseSuccess());  
        })
        .catch(function (error) {
          console.log(error);
          dispatch(updateCourseFailure());
        });
	};
}


export const updateCourseContentStart = () =>{
	return {
		type:actionTypes.UPDATE_COURSE_CONTENT_START
	};
};

export const updateCourseContentSuccess = () =>{
	return {
		type:actionTypes.UPDATE_COURSE_CONTENT_SUCCESS
	};
};

export const updateCourseContentFailure = (error) =>{
	return {
		type:actionTypes.UPDATE_COURSE_CONTENT_FAIL,
		error:error
	};
};

export const updateCoursesContent = (formData,course) =>{
	const url = baseurl+'/updateLinks';
	return async dispatch =>{
		dispatch(updateCourseContentStart());
		let sendObj = {
			formData:formData,
			course:course
		}
	    axios.post(url,sendObj)
            .then(response => {
                console.log(response.data);
                localStorage.removeItem('courseData');
	            dispatch(fetchCourses());
	            localStorage.setItem('updatedCourseContent',  JSON.stringify(response.data));
	            dispatch(updateCourseContentSuccess());
            }).catch(error => {
                console.log(error);
                dispatch(updateCourseContentFailure());
            })
	};
}

export const deleteCourseContentStart = () =>{
	return {
		type:actionTypes.DELETE_COURSE_CONTENT_START
	};
};

export const deleteCourseContentSuccess = () =>{
	return {
		type:actionTypes.DELETE_COURSE_CONTENT_SUCCESS
	};
};

export const deleteCourseContentFailure = (error) =>{
	return {
		type:actionTypes.DELETE_COURSE_CONTENT_FAIL,
		error:error
	};
};

export const deleteCoursesContent = (formData) =>{
	const url = baseurl+'/deleteLink';
	return async dispatch =>{
		dispatch(deleteCourseContentStart());
		 axios.post('/deleteLink',formData)
		      .then(response =>{
		      	  localStorage.removeItem('courseData');
	              dispatch(fetchCourses());
	              localStorage.setItem('deleteCourseContent',  JSON.stringify(response.data));
		          dispatch(deleteCourseContentSuccess());
		      })
		      .catch(error =>{
		          dispatch(deleteCourseContentFailure());
		      });
	};
}

export const deleteCourseStart = () =>{
	return {
		type:actionTypes.DELETE_COURSE_START
	};
};

export const deleteCourseSuccess = () =>{
	return {
		type:actionTypes.DELETE_COURSE_SUCCESS
	};
};

export const deleteCourseFailure = (error) =>{
	return {
		type:actionTypes.DELETE_COURSE_FAIL,
		error:error
	};
};

export const deleteCourses = (formData) =>{
	const url = baseurl+'/deleteCourse';
	return async dispatch =>{
		dispatch(deleteCourseStart());
	    axios.post(url,formData)
	       .then(response=>{
	        	localStorage.removeItem('courseData');
	            dispatch(fetchCourses());
	            localStorage.setItem('deletedCourse',  JSON.stringify(response.data));
	            dispatch(deleteCourseSuccess(response.data));
	        })
	        .catch(function (error) {
	          console.log(error);
	          dispatch(deleteCourseFailure(error));
	        });
	};
}