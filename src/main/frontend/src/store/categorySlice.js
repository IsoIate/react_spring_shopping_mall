import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
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
        setCategory(state, action) {
            state.best = "베스트";
            state.newProducts = "신상품";
            state.group_1 = "사과/배";
            state.group_2 = "귤/한라봉/감귤류";
            state.group_3 = "수박/메론/참외";
            state.group_4 = "딸기/블루베리/베리류";
            state.group_5 = "그 외 과일";
        },
    },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
