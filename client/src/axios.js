import axios from 'axios';
// import {baseurl} from './constants';

const instance = axios.create({
	baseURL : 'https://prepzone-c127c4b5869a.herokuapp.com'
});

export default instance;
