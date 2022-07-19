import axios from 'axios';


const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
    baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
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

export const getTrips = page => API.get(`/trips?page=${page}`);

export const getTrip = id => API.get(`/trips/${id}`);

export const deleteTrip = id => API.delete(`/trips/${id}`);

export const updateTrip = (tripData, id) => API.patch(`/trips/${id}`, tripData);

export const getTripsByUser = userId => API.get(`/trips/userTrips/${userId}`);

export const getTripsBySearch = searchQuery => API.get(`/trips/search?searchQuery=${searchQuery}`);

export const getTripsByTag = tag => API.get(`/trips/tag/${tag}`);

export const getRelatedTrips = tags => API.post(`/trips/relatedTrips`, { tags });

export const likeTrip = id => API.patch(`/trips/like/${id}`);