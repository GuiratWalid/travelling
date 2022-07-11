import axios from 'axios';


const API = axios.create({
    baseURL: 'http://localhost:5000',
});

API.interceptors.request.use(req => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token
            }`;
    }
    return req;
});


export const signIn = formData => API.post('/users/signin', formData);

export const signUp = formData => API.post('/users/signup', formData);

export const googleSignIn = result => API.post('/users/googlesignin', result);

export const createTrip = tripData => API.post('/trips/', tripData);

export const getTrips = () => API.get('/trips/');

export const getTrip = id => API.get(`/trips/${id}`);