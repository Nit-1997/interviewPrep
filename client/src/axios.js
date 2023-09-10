import axios from 'axios';
// import {baseurl} from './constants';

const instance = axios.create({
	baseURL : 'https://prepzone-backend-svc.onrender.com'
});

export default instance;
