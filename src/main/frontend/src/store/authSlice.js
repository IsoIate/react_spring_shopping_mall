import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogIn: false,
        id: null,
        user: null
    },
    reducers: {
        login(state, action) {
            const { id, user } = action.payload;
            if (id !== undefined) state.id = id;
            if (user !== undefined) state.user = user;
            state.isLogIn = true;
        },
        logout(state) {
            state.id = null;
            state.user = null;
            state.isLogIn = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
