import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-441b3.firebaseio.com/'
});

export default instance;