import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import WorkOut from "../models/WorkOut";

const initialState : WorkOut[]=[];

const api = axios.create({
    baseURL: "http://localhost:3000/workout",
});


export const savingWorkOut = createAsyncThunk(
    "workout/add",
    async (workOut: WorkOut, { rejectWithValue }) => {
        try {
            const response = await api.post("/add", workOut);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);




const WorkOutSlice = createSlice({
    name:"workout",
    initialState:initialState,
    reducers:{
        addWorkOut:(state,action)=>{
            state.push(action.payload);
        },

    },
    extraReducers:(builder)=>{
        builder
            .addCase(savingWorkOut.fulfilled, (state, action)=>{
                state.push(action.payload);
            })
    }
})

export const {} = WorkOutSlice.actions;
export default WorkOutSlice.reducer;