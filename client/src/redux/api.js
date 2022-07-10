import axios from 'axios';


const API = axios.create({
    baseURL: 'http://localhost:5000',
});


export const signIn = formData => API.post('/users/signin', formData);

export const signUp = formData => API.post('/users/signup', formData);

export const googleSignIn = result => API.post('/users/googlesignin', result);

export const createTrip = tripData => API.post('/trips', tripData);