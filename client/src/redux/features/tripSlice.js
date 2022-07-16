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

const tripSlice = createSlice({
    name: 'trip',
    initialState: {
        trip: {},
        trips: [],
        userTrips: [],
        error: '',
        loading: false,
    },
    extraReducers: {
        [createTrip.pending]: (state, action) => {
            state.loading = true;
        },
        [createTrip.fulfilled]: (state, action) => {
            state.loading = false;
            state.trips = action.payload;
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
            const { arg } = action.meta;
            console.log(arg)
            if (arg) {
                state.userTrips = state.userTrips.filter(item => item._id !== arg.id);
                state.trips = state.trips.filter(item => item._id !== arg.id);
            }
        },
        [deleteTrip.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});


export default tripSlice.reducer;