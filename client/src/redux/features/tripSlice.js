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
    },
});


export default tripSlice.reducer;