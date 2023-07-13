import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";

const userSlice = createSlice({
    name: 'userLegacy',
    initialState: {
        data: {
            name: 'Sikaneta',
            sec: 'get-it'
        }
    },
    reducers: {
    }
});

export const userReducer = userSlice.reducer;