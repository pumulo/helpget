import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";

const userSlice = createSlice({
    name: 'userLegacy',
    initialState: {
        data: {
            email: 'pumulo.sikaneta@pega.com',
            password: 'get-it'
        }
    },
    reducers: {
    }
});

export const userReducer = userSlice.reducer;