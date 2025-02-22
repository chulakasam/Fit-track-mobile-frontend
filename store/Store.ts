import {combineReducers, configureStore} from "@reduxjs/toolkit";
import CustomerSlice from "../reducers/CustomerSlice";

const rootReducer = combineReducers({
    customers: CustomerSlice,
    // items: ItemSlice,
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;

