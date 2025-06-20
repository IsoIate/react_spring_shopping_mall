import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name: "user",
    initialState: "kim",
    reducers: {
        changeName(state) {
            return 'john' + state
        }
    }
})

let orderInfo = createSlice({
    name: "order",
    initialState: {
        title: "",
        price: "",
        orderQy: 0,
        inventoryQy: 0,
        info: "",
        imgUrl: "",
    },
    reducers: {
        updateOrder(state, action) {
            const { title, price, orderQy, inventoryQy, info, imgUrl } = action.payload;
            if (title !== undefined) state.title = title;
            if (price !== undefined) state.price = price;
            if (orderQy !== undefined) state.orderQy = orderQy;
            if (inventoryQy !== undefined) state.inventoryQy = inventoryQy;
            if (info !== undefined) state.info = info;
            if (imgUrl !== undefined) state.imgUrl = imgUrl;
        }
    }
})

export let { updateOrder } = orderInfo.actions;

export default configureStore({
    reducer: {
        user: user.reducer,
        order: orderInfo.reducer
    }
})

