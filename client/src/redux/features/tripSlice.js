import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';


export const createTrip = createAsyncThunk(
    'trips/createTrip',
    async ({ updatedTripData, navigate, toast }, { rejectWithValue }) => {
        try {
            const response = await api.createTrip(updatedTripData);
            toast.success('Trip Added Successfully');
            navigate('/');
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const getTrips = createAsyncThunk(
    'trips/getTrips',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.getTrips();
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const getTrip = createAsyncThunk(
    'trips/getTrip',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.getTrip(id);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const getTripsByUser = createAsyncThunk(
    'trips/getTripsByUser',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.getTripsByUser(id);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const deleteTrip = createAsyncThunk(
    'trips/deleteTrip',
    async ({ id, toast }, { rejectWithValue }) => {
        try {
            const response = await api.deleteTrip(id);
            toast.success('Trip Deleted Successfully')
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateTrip = createAsyncThunk(
    'trips/updateTrip',
    async ({ id, updatedTripData, toast, navigate }, { rejectWithValue }) => {
        try {
            const response = await api.updateTrip(updatedTripData, id);
            toast.success('Trip Updated Successfully')
            navigate('/');
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const getTripsBySearch = createAsyncThunk(
    'trips/getTripsBySearch',
    async (searchQuery, { rejectWithValue }) => {
        try {
            const response = await api.getTripsBySearch(searchQuery);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const getTripsByTag = createAsyncThunk(
    'trips/getTripsByTag',
    async (tag, { rejectWithValue }) => {
        try {
            const response = await api.getTripsByTag(tag);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

const tripSlice = createSlice({
    name: 'trip',
    initialState: {
        trip: {},
        trips: [],
        userTrips: [],
        tagTrips: [],
        error: '',
        loading: false,
    },
    extraReducers: {
        [createTrip.pending]: (state, action) => {
            state.loading = true;
        },
        [createTrip.fulfilled]: (state, action) => {
            state.loading = false;
            state.trips = [...state.trips, action.payload];
        },
        [createTrip.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getTrips.pending]: (state, action) => {
            state.loading = true;
        },
        [getTrips.fulfilled]: (state, action) => {
            state.loading = false;
            state.trips = action.payload;
        },
        [getTrips.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getTrip.pending]: (state, action) => {
            state.loading = true;
        },
        [getTrip.fulfilled]: (state, action) => {
            state.loading = false;
            state.trip = action.payload;
        },
        [getTrip.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getTripsByUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getTripsByUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userTrips = action.payload;
        },
        [getTripsByUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deleteTrip.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteTrip.fulfilled]: (state, action) => {
            state.loading = false;
            const { arg: { id } } = action.meta;
            if (id) {
                state.userTrips = state.userTrips.filter(item => item._id !== id);
                state.trips = state.trips.filter(item => item._id !== id);
            }
        },
        [deleteTrip.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateTrip.pending]: (state, action) => {
            state.loading = true;
        },
        [updateTrip.fulfilled]: (state, action) => {
            state.loading = false;
            const { arg: { id } } = action.meta;
            if (id) {
                state.userTrips = state.userTrips.map(item => item._id === id ? action.payload : item);
                state.trips = state.trips.map(item => item._id === id ? action.payload : item);
            }
        },
        [updateTrip.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getTripsBySearch.pending]: (state, action) => {
            state.loading = true;
        },
        [getTripsBySearch.fulfilled]: (state, action) => {
            state.loading = false;
            state.trips = action.payload;
        },
        [getTripsBySearch.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getTripsByTag.pending]: (state, action) => {
            state.loading = true;
        },
        [getTripsByTag.fulfilled]: (state, action) => {
            state.loading = false;
            state.tagTrips = action.payload;
        },
        [getTripsByTag.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});


export default tripSlice.reducer;