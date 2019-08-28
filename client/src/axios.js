import axios from 'axios';

const instance = axios.create({
	baseURL : 'https://prepzone.herokuapp.com'
});

export default instance;

//'https://prepzone.herokuapp.com'