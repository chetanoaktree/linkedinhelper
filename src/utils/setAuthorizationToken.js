import axios from 'axios';

export default function setAuthorizationToken(token) {
  if(token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
    axios.defaults.headers.common['X-XSS-Protection'] = '1; mode=block'; 
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
}



