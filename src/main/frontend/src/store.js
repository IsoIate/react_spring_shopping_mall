import { configureStore, createSlice } from '@reduxjs/toolkit'

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

let orderInfo = createSlice({
    name: "order",
    initialState: {
        title: "",
        price: "",
        orderQy: 0,
        inventoryQy: 0,
        unit: "",
        imgUrl: "",
    },
    reducers: {
        updateOrder(state, action) {
            const { title, price, orderQy, inventoryQy, unit, imgUrl } = action.payload;
            if (title !== undefined) state.title = title;
            if (price !== undefined) state.price = price;
            if (orderQy !== undefined) state.orderQy = orderQy;
            if (inventoryQy !== undefined) state.inventoryQy = inventoryQy;
            if (unit !== undefined) state.unit = unit;
            if (imgUrl !== undefined) state.imgUrl = imgUrl;
        }
    }
})

export let { updateOrder } = orderInfo.actions;

export default configureStore({
    reducer: {
        category: categoryInfo.reducer,
        order: orderInfo.reducer
    }
})

