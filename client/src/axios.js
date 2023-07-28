import axios from 'axios';

const instance = axios.create({
	baseURL : 'https://prepzone-c127c4b5869a.herokuapp.com/'
});

export default instance;

//'https://prepzone.herokuapp.com'
