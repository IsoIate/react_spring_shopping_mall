import { configureStore, createSlice } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage 사용
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import orderReducer from './orderSlice';


// 기존

let categoryInfo = createSlice({
    name: "category",
    initialState: {
        best: "베스트",
        newProducts: "신상품",
        group_1: "사과/배",
        group_2: "귤/한라봉/감귤류",
        group_3: "수박/메론/참외",
        group_4: "딸기/블루베리/베리류",
        group_5: "그 외 과일"
    },
    reducers: {

    }
})

// let orderInfo = createSlice({
//     name: "order",
//     initialState: {
//         title: "",
//         price: "",
//         orderQy: 0,
//         inventoryQy: 0,
//         unit: "",
//         imgUrl: "",
//     },
//     reducers: {
//         updateOrder(state, action) {
//             const { title, price, orderQy, inventoryQy, unit, imgUrl } = action.payload;
//             if (title !== undefined) state.title = title;
//             if (price !== undefined) state.price = price;
//             if (orderQy !== undefined) state.orderQy = orderQy;
//             if (inventoryQy !== undefined) state.inventoryQy = inventoryQy;
//             if (unit !== undefined) state.unit = unit;
//             if (imgUrl !== undefined) state.imgUrl = imgUrl;
//         }
//     }
// })


// 추가
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'order'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ store 생성
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);


// 기존
// export let { updateOrder } = orderInfo.actions;

export default configureStore({
    reducer: {
        category: categoryInfo.reducer,
        // order: orderInfo.reducer,
    }
})


