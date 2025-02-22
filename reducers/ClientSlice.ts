import {CustomerModel} from "../models/CustomerModel";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Client from "../models/Client";
import axios from "axios";

const initialState : Client[]=[];

const api = axios.create({
    baseURL: "http://localhost:3000/client",
});


export const savingClient = createAsyncThunk(
    "client/add",
    async (client: Client, { rejectWithValue }) => {
        try {
            const response = await api.post("/add", client);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);




const ClientSlice = createSlice({
    name:"client",
    initialState:initialState,
    reducers:{
        addClient:(state,action)=>{
            state.push(action.payload);
        },

    },
    extraReducers:(builder)=>{
        builder
            .addCase(savingClient.fulfilled, (state, action)=>{
                state.push(action.payload);
            })


    }
})

export const {} = ClientSlice.actions;
export default ClientSlice.reducer;