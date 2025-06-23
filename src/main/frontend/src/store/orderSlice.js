import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
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
        },
    },
});

export const { updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
