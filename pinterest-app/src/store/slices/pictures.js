import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = "https://6666aa6ba2f8516ff7a44d13.mockapi.io/blum/api/v1/pictures"

const initialState = {
    list: [],
    loading:  false,
    error: null,
}

export const getPictures = createAsyncThunk("pictures/getPictures", async () =>  {
    const response = await axios.get(API_URL);

    console.log(response)

    if(response.status !== 200){
        console.error('Error while fetching storage data!');
        return [];
    }

    return await response.data;
})

export const deletePicture = createAsyncThunk("pictures/deletePicture", async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);

    if(response.status !== 200){
        console.error('Error while deleting storage data!');
    }

    return await response.data;
})

export const getPictureById = createAsyncThunk("pictures/getPictureById", async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);

    if(response.status !== 200){
        console.error('Error while fetching storage data!');
    }

    return await response.data;
})

const picturesSlice = createSlice({
    name: 'pictures',
    initialState,
    reducers: {
        setPictures: (state, action) => {
            state.list = action.payload;
        }
    },
    extraReducers: (builder) => {
        //getPictures
        builder.addCase(getPictures.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getPictures.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
            state.error = null;
        });

        builder.addCase(getPictures.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });

        //deletePicture
        builder.addCase(deletePicture.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(deletePicture.fulfilled, (state, action) => {
            const deletedPictureId = action.payload.id;

            state.list = state.list.filter((picture) => picture.id !== deletedPictureId);

            state.loading = false;
            state.error = null;
        });

        builder.addCase(deletePicture.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    }
})


export const { setPictures } = picturesSlice.actions;
export default picturesSlice.reducer;