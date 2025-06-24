import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogIn: false,
        id: null,
        user: null,
        role: null
    },
    reducers: {
        login(state, action) {
            const { id, user, role } = action.payload;
            if (id !== undefined) state.id = id;
            if (user !== undefined) state.user = user;
            if (role !== undefined) state.role = role;
            state.isLogIn = true;
        },
        logout(state) {
            state.id = null;
            state.user = null;
            state.role = null;
            state.isLogIn = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
