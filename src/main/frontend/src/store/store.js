import { configureStore, createSlice } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import orderReducer from './orderSlice';
import categoryReducer from './categorySlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'order', 'category'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    order: orderReducer,
    category: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);



